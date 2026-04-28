import { Client } from "@microsoft/microsoft-graph-client"

interface UploadedFile {
  name: string
  oneDriveUrl: string
  size: number
}

let tokenCache: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token
  }

  const tenantId = process.env.AZURE_TENANT_ID!
  const clientId = process.env.AZURE_CLIENT_ID!
  const clientSecret = process.env.AZURE_CLIENT_SECRET!

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  )

  if (!res.ok) {
    throw new Error(`Token fetch failed: ${res.status}`)
  }

  const data = await res.json()
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return data.access_token
}

function getGraphClient(accessToken: string): Client {
  return Client.init({
    authProvider: (done) => done(null, accessToken),
  })
}

export async function uploadToOneDrive(
  submissionId: string,
  files: Array<{ name: string; buffer: Buffer; size: number }>
): Promise<UploadedFile[]> {
  const userId = process.env.ONEDRIVE_USER_ID
  const folder = process.env.ONEDRIVE_UPLOAD_FOLDER || "Sunlite Leads"

  if (!userId || !process.env.AZURE_TENANT_ID) {
    console.warn("OneDrive not configured — skipping upload")
    return []
  }

  const accessToken = await getAccessToken()
  const client = getGraphClient(accessToken)

  const now = new Date()
  const monthFolder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const basePath = `/users/${userId}/drive/root:/${folder}/${monthFolder}/${submissionId}`

  const results: UploadedFile[] = []

  for (const file of files) {
    try {
      const uploadPath = `${basePath}/${file.name}:/content`
      await client.api(uploadPath).put(file.buffer)

      const itemPath = `${basePath}/${file.name}`
      const shareRes = await client.api(`${itemPath}:/createLink`).post({
        type: "view",
        scope: "organization",
      })

      results.push({
        name: file.name,
        oneDriveUrl: shareRes.link?.webUrl || "",
        size: file.size,
      })
    } catch (err) {
      console.error(`OneDrive upload failed for ${file.name}:`, err)
    }
  }

  return results
}

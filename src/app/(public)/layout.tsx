import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('sunlite-theme');if(t)document.documentElement.classList.add('theme-'+t)}catch(e){}})()`,
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <ThemeSwitcher />
    </>
  );
}

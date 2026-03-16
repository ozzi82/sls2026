import {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
  Wind, Scissors, Mountain, Sun, RefreshCw, Download, MessageSquare,
  Moon, Triangle, Type, DollarSign, Paintbrush, Weight, Gem, X,
  Library, Handshake, SearchCheck, Globe, Cog, Microscope,
  CheckCircle2, ClipboardList, ScanSearch, ThermometerSun,
  PackageCheck, ShieldCheck, FileCheck2, AlertTriangle,
  ClipboardCheck, ShieldOff, Store, Ban, XCircle,
  HardHat, Check, Calendar,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
  Wind, Scissors, Mountain, Sun, RefreshCw, Download, MessageSquare,
  Moon, Triangle, Type, DollarSign, Paintbrush, Weight, Gem, X,
  Library, Handshake, SearchCheck, Globe, Cog, Microscope,
  CheckCircle2, ClipboardList, ScanSearch, ThermometerSun,
  PackageCheck, ShieldCheck, FileCheck2, AlertTriangle,
  ClipboardCheck, ShieldOff, Store, Ban, XCircle,
  HardHat, Check, Calendar,
};

export function getIconComponent(name: string): LucideIcon | null {
  return iconMap[name] || null;
}

export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap).sort();
}

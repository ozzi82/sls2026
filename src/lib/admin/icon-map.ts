import {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
};

export function getIconComponent(name: string): LucideIcon | null {
  return iconMap[name] || null;
}

export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap).sort();
}

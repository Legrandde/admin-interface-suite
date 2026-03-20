import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  photo?: string;
}

const ProfilPage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Try common profile endpoints
        const data = await apiRequest<UserProfile>("/profil/");
        setProfile(data);
        if (data.photo) setPhotoPreview(data.photo);
      } catch {
        // Fallback: decode from JWT
        const token = localStorage.getItem("access_token");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setProfile((p) => ({
              ...p,
              username: payload.username || payload.sub || "",
              email: payload.email || "",
              first_name: payload.first_name || "",
              last_name: payload.last_name || "",
            }));
          } catch {
            // ignore
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (key: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiRequest("/profil/", {
        method: "PUT",
        body: profile,
      });
      toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const initials = `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || profile.username?.[0] || "U"}`.toUpperCase();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Mon profil</h1>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Photo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={photoPreview || ""} />
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="photo-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Cliquez sur l'avatar pour changer votre photo.</p>
                  <p className="text-xs mt-1">JPG, PNG • Max 2 Mo</p>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    id="first_name"
                    value={profile.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    id="last_name"
                    value={profile.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Enregistrer
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilPage;

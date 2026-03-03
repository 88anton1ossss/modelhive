import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { useTheme } from "../components/ThemeProvider";
import { Palette, Check } from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { colorScheme, setColorScheme, isDark, toggleDark } = useTheme();

  const colorSchemes = [
    { id: "purple", name: "Purple", colors: ["#8b5cf6", "#a78bfa"] },
    { id: "pink", name: "Pink", colors: ["#ec4899", "#f472b6"] },
    { id: "blue", name: "Blue", colors: ["#3b82f6", "#60a5fa"] },
    { id: "green", name: "Green", colors: ["#10b981", "#34d399"] },
    { id: "orange", name: "Orange", colors: ["#f59e0b", "#fbbf24"] },
  ] as const;

  return (
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="payout">Payout</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="sarahchen" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" defaultValue="Sarah Chen" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell people about yourself..."
                rows={4}
                className="mt-2"
                defaultValue="Professional photographer and AI artist specializing in cinematic portraits."
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://"
                className="mt-2"
                defaultValue="https://sarahchen.com"
              />
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-violet-500 hover:bg-violet-600">
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Switch between light and dark mode
                  </p>
                </div>
                <Switch
                  defaultChecked={isDark}
                  onCheckedChange={toggleDark}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Color Scheme</Label>
                <p className="text-sm text-muted-foreground mt-2 mb-3">
                  Choose a color scheme for the app
                </p>
                <div className="grid grid-cols-5 gap-4">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      type="button"
                      className={`relative rounded-lg p-4 border-2 transition cursor-pointer hover:scale-105 ${
                        colorScheme === scheme.id 
                          ? "border-[var(--scheme-primary)] shadow-lg" 
                          : "border-border hover:border-[var(--scheme-primary)]/50"
                      }`}
                      onClick={() => setColorScheme(scheme.id as any)}
                    >
                      {colorScheme === scheme.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: scheme.colors[0] }}>
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className="w-full aspect-square rounded-lg mb-2 shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${scheme.colors[0]} 0%, ${scheme.colors[1]} 100%)`,
                        }}
                      />
                      <p className="text-xs font-medium text-center">{scheme.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Payout Tab */}
        <TabsContent value="payout">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div>
                <p className="font-medium text-green-500">Stripe Connected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your account is ready to receive payments
                </p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>

            <div>
              <Label>Payout Method</Label>
              <p className="text-sm text-muted-foreground mt-2 mb-3">
                Payments are processed through Stripe
              </p>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-violet-500">S</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Stripe Account</p>
                  <p className="text-sm text-muted-foreground">sarah@example.com</p>
                </div>
              </div>
            </div>

            <div>
              <Label>Minimum Payout</Label>
              <p className="text-sm text-muted-foreground mt-2 mb-3">
                Request payout when balance reaches
              </p>
              <Input type="number" defaultValue="100" className="max-w-xs" />
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Purchase</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get notified when someone buys your model
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>New Follower</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get notified when someone follows you
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>New Review</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get notified when someone reviews your model
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive updates about new features and tips
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="mt-2"
                  />
                </div>
                <Button className="bg-violet-500 hover:bg-violet-600">
                  Update Password
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 text-destructive">
                Danger Zone
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
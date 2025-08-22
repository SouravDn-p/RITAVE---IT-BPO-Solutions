import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Trash2, Edit, Eye, Save } from "lucide-react"
import Image from "next/image"

const currentImages = [
  {
    id: "hero-banner",
    name: "Hero Banner",
    location: "Homepage Hero Section",
    currentImage: "/placeholder.svg?height=200&width=400&text=Hero+Banner",
    size: "1920x1080",
    lastUpdated: "2024-01-10",
    status: "active",
  },
  {
    id: "about-image",
    name: "About Us Image",
    location: "About Page",
    currentImage: "/placeholder.svg?height=200&width=400&text=About+Team",
    size: "800x600",
    lastUpdated: "2024-01-08",
    status: "active",
  },
  {
    id: "services-bg",
    name: "Services Background",
    location: "Services Section",
    currentImage: "/placeholder.svg?height=200&width=400&text=Services+BG",
    size: "1600x900",
    lastUpdated: "2024-01-05",
    status: "active",
  },
  {
    id: "testimonials-bg",
    name: "Testimonials Background",
    location: "Testimonials Section",
    currentImage: "/placeholder.svg?height=200&width=400&text=Testimonials",
    size: "1200x800",
    lastUpdated: "2024-01-03",
    status: "inactive",
  },
]

export default function ImageManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Image Management</h1>
          <p className="text-muted-foreground">Manage homepage banners and website images</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New Image
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Upload New Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-name">Image Name</Label>
                <Input id="image-name" placeholder="Enter image name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-location">Location</Label>
                <select
                  id="image-location"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Select location</option>
                  <option value="hero-banner">Homepage Hero Banner</option>
                  <option value="about-section">About Section</option>
                  <option value="services-section">Services Section</option>
                  <option value="testimonials-section">Testimonials Section</option>
                  <option value="contact-section">Contact Section</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input id="alt-text" placeholder="Describe the image for accessibility" />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (Max 5MB)</p>
                <p className="text-xs text-muted-foreground mt-2">Recommended: 1920x1080 for banners</p>
                <Input type="file" accept="image/*" className="hidden" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Image
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Images */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Current Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {currentImages.map((image) => (
              <div key={image.id} className="flex flex-col lg:flex-row gap-4 p-4 border border-border rounded-lg">
                <div className="lg:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                  <Image
                    width={200}
                    height={200}
                    src={image.currentImage || "/placeholder.svg"}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{image.name}</h3>
                    <Badge variant={image.status === "active" ? "default" : "secondary"} className="text-xs">
                      {image.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{image.location}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Size: {image.size}</span>
                    <span>Updated: {image.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex lg:flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

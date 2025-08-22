import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Trash2, Mail, Phone, Download } from "lucide-react"

const inquiries = [
  {
    id: "INQ-001",
    name: "Sarah Johnson",
    email: "sarah@medcare.com",
    phone: "+1 (555) 123-4567",
    company: "MedCare Solutions",
    service: "Medical Claims Processing",
    industry: "Healthcare",
    message: "We need HIPAA-compliant medical claims processing for our growing practice...",
    status: "new",
    priority: "high",
    date: "2024-01-15",
    source: "Website Form",
  },
  {
    id: "INQ-002",
    name: "Michael Chen",
    email: "m.chen@techflow.com",
    phone: "+1 (555) 234-5678",
    company: "TechFlow Inc.",
    service: "Web Development",
    industry: "Technology",
    message: "Looking for a modern e-commerce platform with React and Next.js...",
    status: "in-progress",
    priority: "medium",
    date: "2024-01-14",
    source: "WhatsApp",
  },
  {
    id: "INQ-003",
    name: "Emily Rodriguez",
    email: "emily@datapro.com",
    phone: "+1 (555) 345-6789",
    company: "DataPro Services",
    service: "Remote Staffing",
    industry: "E-commerce",
    message: "Need skilled remote developers for our upcoming projects...",
    status: "completed",
    priority: "low",
    date: "2024-01-13",
    source: "Phone Call",
  },
  {
    id: "INQ-004",
    name: "David Wilson",
    email: "david@healthsys.com",
    phone: "+1 (555) 456-7890",
    company: "HealthSys Corp",
    service: "Patient Demographics",
    industry: "Healthcare",
    message: "Require patient demographic entry services with high accuracy...",
    status: "new",
    priority: "high",
    date: "2024-01-12",
    source: "Website Form",
  },
  {
    id: "INQ-005",
    name: "Lisa Thompson",
    email: "lisa@retailplus.com",
    phone: "+1 (555) 567-8901",
    company: "RetailPlus",
    service: "Data Processing",
    industry: "E-commerce",
    message: "Looking for bulk data processing and entry services...",
    status: "in-progress",
    priority: "medium",
    date: "2024-01-11",
    source: "Email",
  },
]

export default function InquiriesManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Inquiry Management</h1>
          <p className="text-muted-foreground">View and manage customer inquiries and leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Send Follow-up
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">New Inquiries</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search inquiries..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select className="px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select className="px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="">All Services</option>
                <option value="medical-claims">Medical Claims</option>
                <option value="web-development">Web Development</option>
                <option value="remote-staffing">Remote Staffing</option>
                <option value="data-processing">Data Processing</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-serif">All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.company}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.industry}</p>
                      </div>
                    </TableCell>
                    <TableCell>{inquiry.service}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inquiry.status === "new"
                            ? "default"
                            : inquiry.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {inquiry.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inquiry.priority === "high"
                            ? "destructive"
                            : inquiry.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {inquiry.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{inquiry.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

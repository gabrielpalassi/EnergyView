import {
  Building2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Globe,
  Presentation,
  Server,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";

export function About() {
  return (
    <>
      {/* Header */}
      <Header title="About EnergyView" />

      {/* Content */}
      <div className="space-y-4 px-3 pb-2">
        <div className="grid gap-4 md:grid-cols-2">
          {/* The Project */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Presentation className="text-primary h-5 w-5" />
                <CardTitle>The Project</CardTitle>
              </div>
              <CardDescription>
                Digital Twin for Energy Monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                EnergyView is an innovative research and development initiative
                in the Digital Twin domain, designed to create a comprehensive
                distributed system for real-time energy monitoring and analysis.
              </p>
              <div className="bg-card rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Key Features</h3>
                <ul className="ml-6 list-disc space-y-1.5 text-sm">
                  <li>Energy consumption and demand monitoring</li>
                  <li>Advanced data visualization and analytics</li>
                  <li>Phase distribution analysis</li>
                </ul>
              </div>
              <p>
                The platform captures granular consumption and demand data from
                the Software Laboratory of the Electrical Engineering Building
                at Poli-USP through a network of IoT devices. This data is then
                processed and transformed into intuitive dashboards that enable
                detailed analysis of energy usage patterns.
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/gabrielpalassi/EnergyView"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Frontend Repository</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* GARSoft */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="text-primary h-5 w-5" />
                <CardTitle>GARSoft</CardTitle>
              </div>
              <CardDescription>Software Architecture Group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GARSoft (Grupo de Arquitetura de Software) is a highly regarded
                research and extension laboratory within the Polytechnic School
                of the University of São Paulo, the leading and most prestigious
                university in Latin America. Dedicated to advancing software
                architecture, GARSoft plays a crucial role in fostering
                innovation, academic excellence, and industry collaboration.
              </p>
              <div className="bg-card rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Our Mission</h3>
                <p className="text-sm">
                  To advance software engineering knowledge through practical
                  research that addresses real-world challenges while fostering
                  collaboration between academia, industry, and society.
                </p>
              </div>
              <p>
                While GARSoft's core expertise is rooted in software
                development, the group adopts a comprehensive and
                interdisciplinary approach that integrates academic research,
                business applications, and social impact. By fostering
                innovation and developing market-oriented solutions, GARSoft not
                only advances technological excellence but also creates
                meaningful connections between these diverse domains.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="text-primary h-5 w-5" />
              <CardTitle>Technologies</CardTitle>
            </div>
            <CardDescription>Technical Stack & Implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium">Frontend</h3>
                <ul className="text-muted-foreground ml-6 list-disc space-y-1 text-sm">
                  <li>React</li>
                  <li>Vite</li>
                  <li>Shadcn/ui</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Backend</h3>
                <ul className="text-muted-foreground ml-6 list-disc space-y-1 text-sm">
                  <li>Python</li>
                  <li>Java</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Infrastructure</h3>
                <ul className="text-muted-foreground ml-6 list-disc space-y-1 text-sm">
                  <li>EMQX Broker</li>
                  <li>NGINX</li>
                  <li>AWS Cloud</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Implementation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="text-primary h-5 w-5" />
              <CardTitle>Technical Implementation</CardTitle>
            </div>
            <CardDescription>System Components & Data Flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="text-primary h-4 w-4" />
                  <h3 className="font-medium">Data Collection</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Custom IoT devices with energy monitoring sensors capture
                  real-time data from electrical panels. The devices transmit
                  data securely to the cloud infrastructure using MQTT protocol
                  for processing and storage.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="text-primary h-4 w-4" />
                  <h3 className="font-medium">Data Processing</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  A distributed processing system analyzes incoming data
                  streams, calculating key metrics and identifying patterns. The
                  system stores data in PostgreSQL databases and employs Python
                  and Java for data analysis and processing.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="text-primary h-4 w-4" />
                  <h3 className="font-medium">Digital Twin Approach</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  The platform creates a virtual representation (digital twin)
                  of the physical electrical system, enabling simulation,
                  prediction, and optimization without disrupting the actual
                  infrastructure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <div className="text-muted-foreground text-center text-sm">
          <p>
            © {new Date().getFullYear()} GARSoft - Software Architecture Group
          </p>
          <p>Polytechnic School of the University of São Paulo</p>
        </div>
      </div>
    </>
  );
}

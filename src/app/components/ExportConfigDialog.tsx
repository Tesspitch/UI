import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FileText, FileDown, Download, Columns, Columns2, Columns3 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ExportConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examTitle: string;
  onExport: (config: ExportConfig) => void;
}

export interface ExportConfig {
  format: "pdf" | "docx";
  columns: 1 | 2 | 3;
}

export default function ExportConfigDialog({ open, onOpenChange, examTitle, onExport }: ExportConfigDialogProps) {
  const [format, setFormat] = useState<"pdf" | "docx">("pdf");
  const [columns, setColumns] = useState<1 | 2 | 3>(1);

  const handleExport = () => {
    onExport({ format, columns });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Export Exam Configuration</DialogTitle>
          <DialogDescription>Configure export settings for "{examTitle}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* File Format Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">File Format</Label>
            <RadioGroup value={format} onValueChange={(value) => setFormat(value as "pdf" | "docx")}>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setFormat("pdf")}>
                  <Card className={`cursor-pointer transition-all ${format === "pdf" ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="pdf" id="pdf" className="border-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#EF4444]" />
                            <span className="font-semibold text-foreground">PDF</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Portable Document Format
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div onClick={() => setFormat("docx")}>
                  <Card className={`cursor-pointer transition-all ${format === "docx" ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="docx" id="docx" className="border-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileDown className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-foreground">DOCX</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Microsoft Word Document
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Column Layout Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Exam Paper Layout</Label>
            <p className="text-sm text-muted-foreground">Choose the number of columns for the exam layout</p>
            <RadioGroup value={columns.toString()} onValueChange={(value) => setColumns(parseInt(value) as 1 | 2 | 3)}>
              <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setColumns(1)}>
                  <Card className={`cursor-pointer transition-all ${columns === 1 ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col items-center space-y-3">
                        <RadioGroupItem value="1" id="col-1" className="border-primary" />
                        <Columns className="w-8 h-8 text-primary" />
                        <div className="text-center">
                          <div className="font-semibold text-foreground">1 Column</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Traditional layout
                          </p>
                        </div>
                        {/* Visual Preview */}
                        <div className="w-full h-16 border-2 border-border rounded bg-accent/30 flex">
                          <div className="flex-1 border-r border-border p-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-muted-foreground/30 rounded w-3/4"></div>
                              <div className="h-1 bg-muted-foreground/30 rounded w-full"></div>
                              <div className="h-1 bg-muted-foreground/30 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div onClick={() => setColumns(2)}>
                  <Card className={`cursor-pointer transition-all ${columns === 2 ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col items-center space-y-3">
                        <RadioGroupItem value="2" id="col-2" className="border-primary" />
                        <Columns2 className="w-8 h-8 text-primary" />
                        <div className="text-center">
                          <div className="font-semibold text-foreground">2 Columns</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Compact layout
                          </p>
                        </div>
                        {/* Visual Preview */}
                        <div className="w-full h-16 border-2 border-border rounded bg-accent/30 flex">
                          <div className="flex-1 border-r border-border p-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-muted-foreground/30 rounded"></div>
                              <div className="h-1 bg-muted-foreground/30 rounded"></div>
                            </div>
                          </div>
                          <div className="flex-1 p-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-muted-foreground/30 rounded"></div>
                              <div className="h-1 bg-muted-foreground/30 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div onClick={() => setColumns(3)}>
                  <Card className={`cursor-pointer transition-all ${columns === 3 ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col items-center space-y-3">
                        <RadioGroupItem value="3" id="col-3" className="border-primary" />
                        <Columns3 className="w-8 h-8 text-primary" />
                        <div className="text-center">
                          <div className="font-semibold text-foreground">3 Columns</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Dense layout
                          </p>
                        </div>
                        {/* Visual Preview */}
                        <div className="w-full h-16 border-2 border-border rounded bg-accent/30 flex">
                          <div className="flex-1 border-r border-border p-1.5">
                            <div className="space-y-1">
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                            </div>
                          </div>
                          <div className="flex-1 border-r border-border p-1.5">
                            <div className="space-y-1">
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                            </div>
                          </div>
                          <div className="flex-1 p-1.5">
                            <div className="space-y-1">
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                              <div className="h-0.5 bg-muted-foreground/30 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Export Summary */}
          <div className="p-4 rounded-lg bg-accent/50 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Export Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Format:</span>
                <span className="font-medium text-foreground">{format.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Layout:</span>
                <span className="font-medium text-foreground">{columns} Column{columns > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exam:</span>
                <span className="font-medium text-foreground truncate ml-2">{examTitle}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleExport} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Export {format.toUpperCase()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
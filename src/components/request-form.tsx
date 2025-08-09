// src/components/request-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitServiceRequest } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, FileText, MessageSquare, MapPin, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

function RequestForm({ tenant }: { tenant: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<File[]>([]);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Please provide more details (minimum 10 characters)";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max
      const isValidType = ['image/', 'application/pdf', 'text/', 'application/msword'].some(type => 
        file.type.startsWith(type)
      );
      return isValidSize && isValidType;
    });

    if (validFiles.length !== files.length) {
      toast.error("Some files were skipped", { 
        description: "Only images, PDFs, text files, and documents under 10MB are allowed" 
      });
    }

    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await submitServiceRequest(tenant, { 
        title: title.trim(), 
        description: description.trim(), 
        reported_location: location.trim() 
      });
      
      toast.success("Request submitted successfully!", { 
        description: "We'll review your request and get back to you soon." 
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setAttachments([]);
      
      // Navigate to requests list after a short delay
      setTimeout(() => {
        router.push(`/portal/${tenant}/requests`);
      }, 2000);
      
    } catch (error: any) {
      const message = error?.response?.data?.detail || error?.message || "Failed to submit request";
      toast.error("Submission failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="card space-y-6 animate-scale-in">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Submit Service Request</h2>
          <p className="text-muted-foreground">
            Describe your issue or request assistance from our support team
          </p>
        </div>

        {/* Title field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Request Title *
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
            }}
            placeholder="Brief summary of your request"
            className={`form-input ${errors.title ? 'border-destructive focus:border-destructive' : ''}`}
            disabled={loading}
            maxLength={100}
          />
          <div className="flex justify-between items-center">
            {errors.title && (
              <p className="text-sm text-destructive animate-fade-in">{errors.title}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {title.length}/100 characters
            </p>
          </div>
        </div>

        {/* Description field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Description *
          </label>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
            }}
            placeholder="Please provide detailed information about your request, including any relevant context, symptoms, or steps you've already taken..."
            className={`form-textarea ${errors.description ? 'border-destructive focus:border-destructive' : ''}`}
            disabled={loading}
            rows={5}
            maxLength={1000}
          />
          <div className="flex justify-between items-center">
            {errors.description && (
              <p className="text-sm text-destructive animate-fade-in">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {description.length}/1000 characters
            </p>
          </div>
        </div>

        {/* Location field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location *
          </label>
          <Input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (errors.location) setErrors(prev => ({ ...prev, location: "" }));
            }}
            placeholder="Building, room number, or specific location"
            className={`form-input ${errors.location ? 'border-destructive focus:border-destructive' : ''}`}
            disabled={loading}
            maxLength={50}
          />
          <div className="flex justify-between items-center">
            {errors.location && (
              <p className="text-sm text-destructive animate-fade-in">{errors.location}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {location.length}/50 characters
            </p>
          </div>
        </div>

        {/* File attachments */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Attachments (Optional)
          </label>
          
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.txt,.doc,.docx"
              disabled={loading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload files or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Images, PDFs, text files up to 10MB each
              </p>
            </label>
          </div>

          {/* Display attached files */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Attached files:</p>
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-accent rounded-lg">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="p-1 hover:bg-destructive/10 rounded text-destructive"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 btn-primary" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
export { RequestForm };
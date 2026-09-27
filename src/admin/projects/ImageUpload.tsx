import { useState } from 'react';
import { supabase } from '@/src/lib/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
}

export function ImageUpload({ onUpload, currentUrl }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "relative aspect-video rounded-2xl border-2 border-dashed transition-all overflow-hidden",
          preview 
            ? "border-brand-olive/30 bg-brand-offwhite" 
            : "border-brand-beige bg-brand-offwhite hover:border-brand-olive hover:bg-brand-beige/20"
        )}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <label className="p-3 bg-brand-offwhite rounded-full cursor-pointer hover:scale-110 transition-transform">
                <Upload size={20} className="text-brand-olive" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
              </label>
              <button 
                onClick={() => { setPreview(''); onUpload(''); }}
                className="p-3 bg-brand-offwhite rounded-full hover:scale-110 transition-transform"
              >
                <X size={20} className="text-red-500" />
              </button>
            </div>
          </>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group p-12">
            <div className="w-16 h-16 bg-brand-grey/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-olive/10 transition-all">
              {uploading ? <Loader2 className="animate-spin text-brand-olive" /> : <ImageIcon className="text-neutral-400 group-hover:text-brand-olive" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-brand-olive transition-colors">
              {uploading ? 'Uploading...' : 'Upload Project Image'}
            </span>
            <span className="text-[10px] text-neutral-400 mt-2">Recommended: 16:9 aspect ratio, max 2MB</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFile} disabled={uploading} />
          </label>
        )}
      </div>
    </div>
  );
}

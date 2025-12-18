import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from "@/components/ui/morphing-popover";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailInfo {
  title: string;
  paragraph: string;
}

interface BlogDetail {
  _id: string;
  title: string;
  authorName: string;
  authorRole: string;
  slug: string;
  image: { url: string; fileName: string };
  smallDescription: string;
  largeImage: { url: string; fileName: string };
  detailInfo: DetailInfo[];
}

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  authorName: string;
  authorRole: string;
  description: string;
  slug: string;
}

const BlogCard = ({
  id,
  image,
  title,
  authorName,
  authorRole,
  description,
}: BlogCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogDetail = async () => {
    if (blogDetail) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://acm-blog-backend.vercel.app/api/blogs/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setBlogDetail(data);
      }
    } catch (error) {
      console.error("Failed to fetch blog detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPopover = () => {
    setIsOpen(true);
    fetchBlogDetail();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative overflow-hidden rounded-xl"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-64 object-cover rounded-xl shadow-2xl shadow-primary/5 border border-border/30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-y-3 justify-center"
      >
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground leading-tight">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {authorName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{authorName}</p>
            <p className="text-xs text-muted-foreground">{authorRole}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
          <MorphingPopoverTrigger
            onClick={handleOpenPopover}
            className="self-start mt-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Read More
          </MorphingPopoverTrigger>

          <MorphingPopoverContent className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {isLoading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : blogDetail ? (
              <div className="h-full overflow-y-auto">
                {/* Banner Image with Overlay */}
                <div className="relative h-48 md:h-64 w-full">
                  <img
                    src={blogDetail.largeImage?.url || blogDetail.image.url}
                    alt={blogDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                      {blogDetail.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-white/80">
                        By {blogDetail.authorName}
                      </span>
                      <span className="text-white/50">•</span>
                      <span className="text-sm text-white/60">
                        {blogDetail.authorRole}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {blogDetail.smallDescription}
                  </p>

                  {blogDetail.detailInfo?.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-2"
                    >
                      <h3 className="text-lg font-semibold text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {info.paragraph}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Failed to load blog details.
              </div>
            )}
          </MorphingPopoverContent>
        </MorphingPopover>
      </motion.div>
    </div>
  );
};

export { BlogCard };

import { motion } from "framer-motion";

interface BlogCardProps {
  image: string;
  title: string;
  authorName: string;
  authorRole: string;
  description: string;
  slug: string;
}

const BlogCard = ({
  image,
  title,
  authorName,
  authorRole,
  description,
}: BlogCardProps) => {
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

        <button className="self-start mt-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Read More
        </button>
      </motion.div>
    </div>
  );
};

export { BlogCard };

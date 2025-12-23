import { useQuery } from "@tanstack/react-query";
import { AnimatedTabs, Tab } from "@/components/AnimatedTabs";
import { BlogCard } from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import '../App.css'

interface BlogPost {
  _id: string;
  title: string;
  authorName: string;
  authorRole: string;
  slug: string;
  smallDescription: string;
  image: {
    url: string;
    fileName: string;
  };
}

const fetchBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch("https://acm-blog-backend.vercel.app/api/blogs/");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

const LoadingSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="flex gap-2 mb-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-lg bg-muted" />
      ))}
    </div>
    <Skeleton className="h-80 w-full rounded-xl bg-muted" />
  </div>
);

const Index = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const tabs: Tab[] = blogs?.map((blog) => ({
    id: blog._id,
    label: blog.authorName.split(" ")[0],
    content: (
      <BlogCard
        id={blog._id}
        image={blog.image.url}
        title={blog.title}
        authorName={blog.authorName}
        authorRole={blog.authorRole}
        description={blog.smallDescription}
        slug={blog.slug}
      />
    ),
  })) || [];

  return (
    <main className="min-h-screen bg-background flex flex-col items-center pt-16 md:pt-24 lg:pt-32p-6 md:p-12">
      {/* Background gradient effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl top-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Latest Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore cutting-edge articles on AI, machine learning, and technology innovation.
          </p>
        </header>

        {isLoading && <LoadingSkeleton />}

        {error && (
          <div className="text-center py-12 glass rounded-xl">
            <p className="text-destructive">Failed to load blogs. Please try again later.</p>
          </div>
        )}

        {blogs && blogs.length > 0 && (
          <AnimatedTabs tabs={tabs} className="mx-auto" />
        )}
      </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
      <div className="footerContainer">
        <Footer />
      </div>
    </main>
  );
};

export default Index;

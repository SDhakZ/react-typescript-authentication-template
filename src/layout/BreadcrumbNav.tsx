import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useLocation, Link } from "react-router-dom";

export function BreadcrumbNav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) => {
    const decoded = decodeURIComponent(segment);

    // Handle 101-hulu → Hulu
    if (/^\d+-/.test(decoded)) {
      const brandSlug = decoded.split("-").slice(1).join(" ");
      return brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1);
    }

    // Handle normal slugs → replace hyphens with spaces
    return (
      decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, " ")
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((segment, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = formatLabel(segment);

          return (
            <BreadcrumbItem key={routeTo}>
              {isLast ? (
                <span className=" text-muted-foreground">{label}</span>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>{label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

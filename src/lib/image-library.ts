/**
 * image-library.ts
 * 
 * Curated list of verified, working images.unsplash.com URLs
 * organized by industry and visual categories. 
 * Stops the model from hallucinating broken or dead image links.
 */

export interface UnsplashImage {
  id: string;
  url: string;
  description: string;
}

export const IMAGE_LIBRARY: Record<string, UnsplashImage[]> = {
  "restaurant-food": [
    {
      id: "photo-1544025162-d76694265947",
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      description: "Premium steak with rosemary garnish"
    },
    {
      id: "photo-1565299624946-b28f40a0ae38",
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
      description: "Gourmet woodfired pizza"
    },
    {
      id: "photo-1482049016688-2d3e1b311543",
      url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop&q=80",
      description: "Avocado toast with egg salad"
    },
    {
      id: "photo-1555939594-58d7cb561ad1",
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      description: "Grilled chicken skewers and bbq"
    },
    {
      id: "photo-1473093295043-cdd812d0e601",
      url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80",
      description: "Healthy pesto pasta bowl"
    },
    {
      id: "photo-1476224203421-9ac39bcb3327",
      url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=80",
      description: "Assorted gourmet seafood platter"
    },
    {
      id: "photo-1565958011703-44f9829ba187",
      url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80",
      description: "Fresh strawberry cheesecake slice"
    },
    {
      id: "photo-1513530534585-c7b1394c6d51",
      url: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=800&auto=format&fit=crop&q=80",
      description: "Specialty latte art in ceramic cup"
    }
  ],
  "restaurant-interior": [
    {
      id: "photo-1517248135467-4c7edcad34c4",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
      description: "Modern upscale restaurant dining room"
    },
    {
      id: "photo-1550966871-3ed3cdb5ed0c",
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop&q=80",
      description: "Bustling warm bistro interior"
    },
    {
      id: "photo-1554118811-1e0d58224f24",
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80",
      description: "Cozy minimal cafe storefront"
    },
    {
      id: "photo-1498654896293-37aacf113fd9",
      url: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&auto=format&fit=crop&q=80",
      description: "Spacious luxury dining with mood lighting"
    }
  ],
  "salon-interior": [
    {
      id: "photo-1560066984-138dadb4c035",
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80",
      description: "Chic luxury hair salon styling stations"
    },
    {
      id: "photo-1521590832167-7bcbfaa6381f",
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&auto=format&fit=crop&q=80",
      description: "Bright minimal spa reception area"
    },
    {
      id: "photo-1600948836101-f9ffda59d250",
      url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&auto=format&fit=crop&q=80",
      description: "Premium massage treatment bed setup"
    },
    {
      id: "photo-1527799841627-d1194fd8ec77",
      url: "https://images.unsplash.com/photo-1527799841627-d1194fd8ec77?w=1200&auto=format&fit=crop&q=80",
      description: "Elegant beauty parlor hair wash basins"
    }
  ],
  "salon-service": [
    {
      id: "photo-1562322140-8baeececf3df",
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80",
      description: "Hair stylist blowing out hair at salon"
    },
    {
      id: "photo-1512290923902-8a9f81dc236c",
      url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80",
      description: "Facial mask treatment aesthetician"
    },
    {
      id: "photo-1607604276583-eef5d076aa5f",
      url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
      description: "Nail technician applying manicure polish"
    },
    {
      id: "photo-1519699047748-de8e457a634e",
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80",
      description: "Stylist trimming hair with scissors"
    }
  ],
  "office-professional": [
    {
      id: "photo-1486406146926-c627a92ad1ab",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      description: "Glass architectural corporate office tower"
    },
    {
      id: "photo-1497366216548-37526070297c",
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      description: "Modern open plan design agency workplace"
    },
    {
      id: "photo-1431540015161-0bf868a2d407",
      url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&auto=format&fit=crop&q=80",
      description: "Professional team meeting around table"
    },
    {
      id: "photo-1454165804606-c3d57bc86b40",
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
      description: "Laptop, charts, and analysis papers"
    }
  ],
  "retail-product": [
    {
      id: "photo-1441986300917-64674bd600d8",
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
      description: "Premium clothing store display rack"
    },
    {
      id: "photo-1472851294608-062f824d29cc",
      url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80",
      description: "Chic boutique cosmetics and store counter"
    },
    {
      id: "photo-1523275335684-37898b6baf30",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      description: "Minimalist cosmetic product bottle"
    },
    {
      id: "photo-1505740420928-5e560c06d30e",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      description: "Over-ear luxury headphones product shoot"
    }
  ]
};

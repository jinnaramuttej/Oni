export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Isabelle Renaud",
    role: "Founder & Creative Director",
    image:
      "https://images.pexels.com/photos/19080880/pexels-photo-19080880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  },
  {
    name: "Marcus Aldridge",
    role: "Executive Creative Director",
    image:
      "https://images.pexels.com/photos/36687797/pexels-photo-36687797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  },
  {
    name: "Sena Okafor",
    role: "Head of Design",
    image:
      "https://images.pexels.com/photos/36181540/pexels-photo-36181540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  },
  {
    name: "Lior Kessem",
    role: "Director of Technology",
    image:
      "https://images.pexels.com/photos/34180072/pexels-photo-34180072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  },
];

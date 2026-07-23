import { motion } from 'framer-motion';

interface Props {
  title: string;
  category: string;
  image: string;
}

const ProjectCard = ({ title, category, image }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      className="group relative h-[600px] overflow-hidden rounded-3xl"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-8 left-8 text-white">
        <p className="text-sm uppercase tracking-widest text-gray-300">{category}</p>
        <h3 className="text-4xl font-bold mt-2">{title}</h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

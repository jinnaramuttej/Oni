const Footer = () => {
  return (
    <footer className="px-8 py-16 bg-[#0A0A0A] border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-4xl font-black">AETHER</h2>
        <div className="text-gray-400 text-sm">© 2026 Aether Agency. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

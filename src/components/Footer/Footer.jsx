import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import LinkedIn and GitHub icons

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        {/* LinkedIn Icon and Link */}
        <a
          href="https://www.linkedin.com/in/ashrafulhossain1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition duration-300"
        >
          <FaLinkedin size={24} />
        </a>

        {/* GitHub Icon and Link */}
        <a
          href="https://github.com/ashrafulhossain1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition duration-300"
        >
          <FaGithub size={24} />
        </a>
      </div>

      {/* Copyright Text */}
      <p className="text-center mt-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Asharful Hossain | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
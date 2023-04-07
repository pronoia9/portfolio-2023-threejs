import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjS from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div className='flex-[0.75] bg-black-100 p-8 rounded-xl' variants={slideIn('left', 'tween', 0.2, 1)}>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form className='mt-12 flex flex-col gap-8' ref={formRef} onSubmit={handleSubmit}></form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

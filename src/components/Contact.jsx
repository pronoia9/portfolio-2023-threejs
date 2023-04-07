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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjS
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        { from_name: form.name, to_name: 'Jay', from_email: form.email, to_email: 'contact@me.com', message: form.message },
        import.meta.env.VITE_EMAILJS_USER
      )
      .then(
        () => {
          alert('Thank you, I will get back to you as soon as possible.');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          console.log(error);
          alert('Something went wrong.');
        }
      );
    setLoading(false);
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div className='flex-[0.75] bg-black-100 p-8 rounded-xl' variants={slideIn('left', 'tween', 0.2, 1)}>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form className='mt-12 flex flex-col gap-8' ref={formRef} onSubmit={handleSubmit}>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              rows='7'
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
            />
          </label>

          <button
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold-shadow-md shadow-primary rounded-xl'
            type='submit'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]' variants={slideIn('right', 'tween', 0.2, 1)}>
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

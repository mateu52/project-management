// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// //import { addProject } from './ProjectsSlice';
// import { AppDispatch } from '../../app/store';

// export const ProjectForm = () => {
//   //const dispatch = useDispatch<AppDispatch>();
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     //dispatch(addProject({ name, description }));
//     setName('');
//     setDescription('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Project Name"
//       />
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Project Description"
//       />
//       <button type="submit">Add Project</button>
//     </form>
//   );
// };
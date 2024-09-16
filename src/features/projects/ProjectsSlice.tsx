import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Typ projektu

export interface TeamMember {
  id: string;
  fields: {
    Name:string;
  }
}

export interface Task {
  id: string;
  fields: {
    Task: string;
    assignedTo: string[];
    status?: string;
  }
}
export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  
}
export interface ProjectApi {
  id: string;
  fields: {
    name: string;
    description?: string;
    tasks: string[]; //Tablica ID zadań, nie pełne zadania
    teamMembers?: string[]; // Tablica ID członków zespołu, nie pełne obiekty
  }
  
}

// Inicjalny stan
const initialState: Project[] = []; 

// export const addTeamMember = createAsyncThunk(
//   'projects/addTeamMember',
//   async ({ projectId, member }: { projectId: number, member: Omit<TeamMember, 'id'> }) => {
//     const response = await fetch(`https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects/${projectId}/teamMembers`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         fields: { name: member.name, role: member.role }
//       }),
//     });
//     const data = await response.json();
//     return { projectId, member: { id: data.id, ...member } };
//   }
// );

// export const addTask = createAsyncThunk(
//   'projects/addTask',
//   async ({ projectId, task }: { projectId: number, task: Omit<Task, 'id'> }) => {
//     const response = await fetch(`https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects/${projectId}/tasks`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         fields: { name: task.task, assignedTo: task.assignedTo, status: task.status }
//       }),
//     });
//     const data = await response.json();
//     console.log(data)
//     return { projectId, task: { id: data.id, ...task } };
//   }
// );
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const projectsResponse = await fetch(`https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    const [tasksResponse, membersResponse] = await Promise.all([
      fetch('https://api.airtable.com/v0/app0OwqInWRNrNUgx/Tasks', {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
      }),
      fetch('https://api.airtable.com/v0/app0OwqInWRNrNUgx/users', {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
      })
    ]);
    // Obsługa błędów po wykonaniu zapytań
    if (!projectsResponse.ok || !tasksResponse.ok || !membersResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const [projectsData, tasksData, membersData] = await Promise.all([
      projectsResponse.json(),
      tasksResponse.json(),
      membersResponse.json()
    ]);
    const tasksMap = new Map<string, Task>(
      tasksData.records.map((task: Task) => [
        task.id,
        {
          id: task.id,
          task: task.fields.Task,
          status: task.fields.status,
          assignedTo: task.fields.assignedTo || []
        }
      ])
    );
    console.log('projectsData',projectsData)
    console.log('tasksData',tasksData)
    console.log('membersData',membersData)
    // Mapowanie członków zespołu
    const membersMap = new Map<string, {id: string,name: string}>(membersData.records.map((member: TeamMember) => [member.id, {
      id: member.id,
      name: member.fields.Name,
    }]));
    console.log('membersMap', membersMap)
    // Mapowanie projektów z zadaniami i członkami zespołu
    return projectsData.records.map((record: ProjectApi) => ({
      id: record.id,
      name: record.fields.name,
      description: record.fields.description,
      tasks: (record.fields.tasks || []).map((taskId: string) => {
        const task = tasksMap.get(taskId);
        return task || {
          id: taskId,
          task: 'Unknown task',
          status: 'Not started',
          assignedTo: []
        };
      }),
      teamMembers: (record.fields.teamMembers || []).map((memberId: string) => membersMap.get(memberId))
    }));
    
  }
);
// Thunk do dodawania projektu
// export const addProject = createAsyncThunk(
//   'projects/addProject',
//   async ({ name, description, tasks }: Omit<Project['fields'], 'id'>) => {
//     const projectData = {
//       fields: {
//         name,
//         description,
//         tasks: tasks.map(task => task.id), // Upewnij się, że ID zadań są poprawne
//       },
//     };
//     console.log("Wysyłane dane projektu:", projectData); // Zaloguj dane
//     const response = await fetch(`https://api.airtable.com/v0/app0OwqInWRNrNUgx/Projects`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(projectData), // Wyślij dane
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error("Błąd serwera:", errorResponse); // Zaloguj odpowiedź błędu
//       throw new Error('Failed to add project');
//     }

//     const data = await response.json();
//     // Zwrócenie danych projektu w formacie zgodnym z typem Project
//     return {
//       id: data.id, // ID projektu z odpowiedzi API
//       fields: {
//         name,
//         description,
//         tasks, // Przekazujemy listę zadań, która powinna być już odpowiednio przetworzona
//       },
//     }; 
//   }
// );

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        removeProject: (state, action) => {
        return state.filter((project) => project.id !== action.payload);
        },
        updateProject: (state, action) => {
        const index = state.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state[index] = {
            ...state[index],
            ...action.payload, // Aktualizujemy projekt niezmiennie
          };
        }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.fulfilled, (_, action) => {
          return action.payload;
        })
        
    },
});

export const { removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;
// test.j
const BASE_URL = 'http://localhost:5000/api'; // change if backend uses a different port

let token = '';
let user = {};
let todoId = '';

async function registerUser() {
  const testEmail = `testuser${Date.now()}@example.com`;
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: testEmail,
      password: '123456'
    })
  });
  const data = await res.json();
  user = data;
  token = data.token;
  console.log('--- REGISTERED USER ---');
  console.log(data);
}

async function loginUser() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: user.email,
      password: '123456'
    })
  });
  const data = await res.json();
  token = data.token;
  console.log('--- LOGGED IN USER ---');
  console.log(data);
}

async function createTodo() {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Test Todo',
      description: 'Created via test script',
      status: 'todo'
    })
  });
  const data = await res.json();
  todoId = data._id;
  console.log('--- TODO CREATED ---');
  console.log(data);
  return data;
}

async function updateTodo() {
  const res = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Updated Test Todo',
      description: 'Updated via test script',
      status: 'in-progress'
    })
  });

  if (!res.ok) {
    const err = await res.json();
    console.log('Update failed:', err);
    return;
  }

  const data = await res.json();
  console.log('--- TODO UPDATED ---');
  console.log(data);
}

async function getTodos() {
  const res = await fetch(`${BASE_URL}/todos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('--- GET TODOS ---');
  console.log(data);
}

async function deleteTodo() {
  const res = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('--- TODO DELETED ---');
  console.log(data);
}

async function testFlow() {
  try {
    await registerUser();
    await loginUser();
    await createTodo();
    await updateTodo();
    await getTodos();
    await deleteTodo();
    console.log('\n✅ All tests completed successfully!');
  } catch (err) {
    console.error('Test flow error:', err);
  }
}

testFlow();

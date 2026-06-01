import request from 'supertest';
import app from '../src/app';

describe('Student API', () => {
  it('GET /students — returns list of all students', async () => {
    const res = await request(app).get('/students');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    // Each entry should have id and name only (lightweight list)
    res.body.forEach((student: { id: string; name: string }) => {
      expect(student).toHaveProperty('id');
      expect(student).toHaveProperty('name');
    });
  });

  it('GET /students/:id/action-center — returns full action center for valid student', async () => {
    const res = await request(app).get('/students/stu_001/action-center');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('student');
    expect(res.body).toHaveProperty('tasks');
    expect(res.body).toHaveProperty('messages');
    expect(res.body).toHaveProperty('summary');
    expect(res.body.student.id).toBe('stu_001');
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(Array.isArray(res.body.messages)).toBe(true);
    expect(res.body.summary).toHaveProperty('totalTasks');
    expect(res.body.summary).toHaveProperty('completedTasks');
    expect(res.body.summary).toHaveProperty('unreadMessages');
    expect(res.body.summary).toHaveProperty('urgencyLevel');
  });

  it('GET /students/:id/action-center — returns 404 for non-existent student', async () => {
    const res = await request(app).get('/students/nonexistent/action-center');

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toContain('not found');
  });
});

describe('Task API', () => {
  it('PATCH /tasks/:taskId/status — updates task status successfully', async () => {
    const res = await request(app)
      .patch('/tasks/tsk_001/status')
      .send({ status: 'in_progress' });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe('tsk_001');
    expect(res.body.status).toBe('in_progress');
    expect(res.body).toHaveProperty('updatedAt');
  });

  it('PATCH /tasks/:taskId/status — returns 400 for invalid status', async () => {
    const res = await request(app)
      .patch('/tasks/tsk_001/status')
      .send({ status: 'invalid_status' });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });
});

describe('Request ID Middleware', () => {
  it('every response includes an X-Request-Id header', async () => {
    const res = await request(app).get('/students');

    expect(res.status).toBe(200);
    expect(res.headers['x-request-id']).toBeDefined();
    // UUID v4 format check
    expect(res.headers['x-request-id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  it('error responses include requestId in body', async () => {
    const res = await request(app).get('/students/nonexistent/action-center');

    expect(res.status).toBe(404);
    expect(res.body.requestId).toBeDefined();
    expect(res.body.requestId).toBe(res.headers['x-request-id']);
  });
});

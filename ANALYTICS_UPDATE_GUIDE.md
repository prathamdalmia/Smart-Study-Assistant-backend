# Analytics Update Guide

## Overview

Analytics are automatically updated throughout the application when certain events occur. This document explains where and how analytics are updated.

## Analytics Service

The analytics update logic is centralized in `src/utils/analyticsService.js`. This service provides functions to update different aspects of analytics.

### Functions:

1. **`incrementNotesCreated(studentId)`** - Increments notes count when a note is created
2. **`updateTaskAnalytics(studentId)`** - Updates task completion count and recalculates productivity score
3. **`updateStudyTime(studentId, studyTimeMinutes)`** - Updates total study time
4. **`getOrCreateAnalytics(studentId)`** - Ensures analytics exist for a student
5. **`calculateProductivityScore()`** - Calculates productivity score based on:
   - Task completion rate (0-50 points)
   - Notes created (0-25 points)
   - Study time (0-25 points)
   - Maximum score: 100

## Where Analytics Are Updated

### 1. When a Note is Created

**Location:** `src/controllers/noteController.js`

**Functions:**
- `createNote()` - Creates a text note
- `uploadNote()` - Uploads a file note

**What happens:**
- `incrementNotesCreated()` is called
- `notesCreated` is incremented by 1
- Productivity score is recalculated
- `lastUpdated` timestamp is updated

### 2. When a Task is Created or Updated

**Location:** `src/controllers/taskController.js`

**Functions:**
- `addTask()` - Creates a new task
- `updateTask()` - Updates an existing task (new endpoint)

**What happens:**
- `updateTaskAnalytics()` is called
- Task completion count is recalculated based on all tasks
- Productivity score is recalculated
- `lastUpdated` timestamp is updated

### 3. When Study Time is Tracked

**Location:** `src/controllers/analyticsController.js`

**Endpoint:** `POST /api/analytics/study-time`

**Request Body:**
```json
{
  "studyTimeMinutes": 30
}
```

**What happens:**
- `updateStudyTime()` is called
- `totalStudyTime` is incremented by the provided minutes
- Productivity score is recalculated
- `lastUpdated` timestamp is updated

### 4. When Analytics are Retrieved

**Location:** `src/controllers/analyticsController.js`

**Endpoint:** `GET /api/analytics`

**What happens:**
- Analytics are fetched or created if they don't exist
- Task analytics are synced to ensure accuracy
- Latest analytics data is returned

## Productivity Score Calculation

The productivity score is calculated using the following formula:

```
Productivity Score = Task Score + Notes Score + Study Time Score

Where:
- Task Score = (Completed Tasks / Total Tasks) * 50 (max 50 points)
- Notes Score = Notes Created * 2 (max 25 points)
- Study Time Score = Study Time (minutes) / 10 (max 25 points)

Maximum Score: 100 points
```

## API Endpoints

### Get Analytics
```
GET /api/analytics
```
Returns current analytics for the authenticated user.

### Update Study Time
```
POST /api/analytics/study-time
Body: { "studyTimeMinutes": 30 }
```
Updates the total study time for the authenticated user.

### Update Task (also updates analytics)
```
PUT /api/tasks/:id
Body: { "status": "Completed", ... }
```
Updates a task and automatically updates analytics.

## Automatic Updates

Analytics are automatically updated in the following scenarios:

1. **Note Creation** - When a user creates a text note or uploads a file
2. **Task Creation** - When a user creates a new task
3. **Task Status Change** - When a user updates a task's status
4. **Study Time Tracking** - When study time is manually recorded
5. **Analytics Retrieval** - Analytics are synced when retrieved to ensure accuracy

## Manual Updates

To manually update study time, you can call:

```javascript
POST /api/analytics/study-time
{
  "studyTimeMinutes": 60
}
```

## Database Schema

Analytics are stored in the `Analytics` collection with the following structure:

```javascript
{
  student: ObjectId,           // Reference to Student
  totalStudyTime: Number,      // Total study time in minutes
  tasksCompleted: Number,      // Number of completed tasks
  notesCreated: Number,        // Number of notes created
  productivityScore: Number,   // Productivity score (0-100)
  lastUpdated: Date           // Last update timestamp
}
```

## Notes

- Analytics are automatically initialized when first accessed
- Productivity score is recalculated whenever any metric changes
- Analytics sync ensures data accuracy when retrieved
- All analytics updates include error handling
- Analytics updates are non-blocking and don't affect the main operation

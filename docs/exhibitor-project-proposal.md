# Project Proposal: Breed and Show Pro

## Executive Summary

Breed and Show Pro is a comprehensive web application designed to help pig exhibitors manage their livestock information for shows and fairs. The application provides a user-friendly interface for tracking detailed pig data, including photos, identification, health records, and show preparation metrics. Built with modern web technologies, the app ensures efficient data management and real-time insights to support exhibitors in preparing their pigs for competitive events.

## Team Members

- Ammon Johnson
- Alex Dombroski

## Objectives

- Provide exhibitors with a centralized platform to manage pig information
- Enable comprehensive tracking of pig health, growth, and show preparation
- Facilitate easy CRUD operations for pig data management
- Offer visual and analytical tools for monitoring pig progress
- Ensure data security and accessibility across devices

## Target Audience

The primary target audience for Breed and Show Pro is pig exhibitors participating in agricultural shows and fairs. This includes:

- Individual farmers and breeders
- 4-H and FFA youth participants
- Professional livestock exhibitors
- Agricultural extension agents and coaches

## Communications

The team will communicate through Discord for daily updates, code reviews, and project coordination.

## Key Features

### Pig Management System

- **Add New Pig**: Create detailed profiles including:
  - Photos (multiple images)
  - Ear Notch (identification number)
  - Name
  - Child (offspring information)
  - Date (birth or acquisition date)
  - Weight (current weight)
  - Notes (general observations)
  - Vaccinations (vaccination history and schedules)
  - Date of Show
  - Days Until Show (calculated field)
  - Weekly Average Weight Gain
  - Estimated Weight at Show (calculated projection)

- **View All Pigs**: Dashboard displaying all pigs with key information in a sortable, filterable table or card layout

- **Edit Pig Information**: Update any field for existing pigs, including adding new photos or updating health records

- **Delete Pigs**: Remove pig records when no longer needed (with confirmation to prevent accidental deletion)

### Data Visualization

- Progress charts showing weight gain over time
- Show preparation timelines
- Health and vaccination tracking

### User Interface

- Responsive design for mobile and desktop use
- Intuitive navigation and forms
- Photo upload and gallery functionality
- Search and filter capabilities

## Technology Stack

### Frontend

- **Framework**: Astro with Svelte components
- **Language**: TypeScript for type safety and better development experience
- **Styling**: Venilla CSS and bitsUI
- **State Management**: Svelte stores for component state

### Backend

- **API**: Simple RESTful API built with Node.js and Express
- **Database**: MongoDB for flexible document storage
- **Authentication**: OAuth with Google

### Development Tools

- **Version Control**: Git
- **Package Management**: pnpm or npm
- **Testing**: Jest for unit tests, Cypress for end-to-end testing
- **Deployment**: Vercel/Netlify for frontend, Railway/Render for backend

## Architecture

The application follows a modern web architecture:

- **Frontend (Astro + Svelte)**: Handles user interface, routing, and client-side logic
- **API Layer (Express.js)**: Provides RESTful endpoints for CRUD operations
- **Database (MongoDB)**: Stores pig data in flexible document format
- **File Storage**: uploadthing for pig photos

### API Endpoints

Codes (200, 400, 401, 403, 404, 500)
Code 200: OK

The RESTful API will include the following endpoints for pig management:

- **GET /api/pigs**: Retrieve all pigs (view pigs)
- **GET /api/pigs/:id**: Retrieve a specific pig by ID
- **POST /api/pigs**: Create a new pig (add pig)
- **PUT /api/pigs/:id**: Update an existing pig's information (edit information)
- **DELETE /api/pigs/:id**: Delete a pig by ID (delete pig)

**Error Handling**:

- **404 Not Found**: Returned when a requested pig ID does not exist or an invalid endpoint is accessed

### Data Model

```javascript
// Pig Schema Example
{
  _id: ObjectId,
  earNotch: String,
  name: String,
  child: String, // offspring info
  date: Date, // birth/acquisition date
  weight: Number,
  notes: String,
  vaccinations: [{
    vaccine: String,
    date: Date,
    notes: String
  }],
  showDate: Date,
  photos: [String], // URLs to stored images
  createdAt: Date,
  updatedAt: Date
}
```

## Implementation Plan

### Phase 1: Core Setup and Basic CRUD

- Set up Astro project with Svelte integration
- Configure TypeScript
- Create basic UI components
- Implement MongoDB connection and basic schema
- Build API endpoints for pig CRUD operations
- Create add/view pig forms

### Phase 2: Advanced Features

- Photo upload functionality
- Data visualization components
- Search and filter capabilities
- Responsive design optimization
- User authentication (if needed)

### Phase 3: Testing and Deployment

- Unit and integration testing
- Deployment to production environment

## Task List

See the [trello](https://trello.com/b/yc29Obfy/breed-and-show-pro)

## Timeline

- **Week 1**: Project setup, basic UI, and database schema
- **Week 2-3**: CRUD operations implementation and Photo management and advanced features
- **Week 3-4**: Testing, optimization, and deployment

## Success Metrics

- Successful CRUD operations for all pig data fields
- Responsive design working on multiple devices
- Accurate calculations for show preparation metrics
- Secure data storage and retrieval

## Conclusion

Breed and Show Pro addresses a specific need in the agricultural community by providing exhibitors with a powerful yet simple tool to manage their pig information. The combination of Astro, Svelte, and TypeScript ensures a modern, maintainable codebase, while MongoDB provides the flexibility needed for comprehensive pig data management. This application will streamline the preparation process for shows and fairs, ultimately helping exhibitors achieve better results in competitive events.

# Modern Portfolio Website

## Overview
A visually stunning, fully responsive personal portfolio website for modern-day developers or designers. The design incorporates current UI/UX trends such as glassmorphism, soft gradients, minimalistic layout, and bold typography.

## Features

### 1. Hero Section
- Professional profile picture display
- Catchy tagline with animated text
- Social media icons with hover effects
- Call-to-action button

### 2. About Me Section
- Short bio with professional description
- Skill set represented via animated progress bars
- Clean, readable typography

### 3. Projects Section
- Interactive cards with hover effects
- Project filtering by category
- Smooth animations and transitions
- Project details including technologies used

### 4. Resume/Experience Section
- Timeline layout for work history and education
- Visual indicators for time periods
- Downloadable resume option

### 5. Contact Me Form
- Form validation for all fields
- Success/error message display
- Integrated map showing location
- Contact information with icons

## Technologies Used
- HTML5
- CSS3 (with modern features like CSS variables, flexbox, grid)
- JavaScript (vanilla, no frameworks)
- Google Fonts
- Font Awesome icons
- Google Maps integration

## Design Elements
- **Glassmorphism**: Transparent/frosted glass effect on cards and navigation
- **Soft Gradients**: Subtle color transitions for buttons and highlights
- **Minimalistic Layout**: Clean design with proper spacing and hierarchy
- **Bold Typography**: Modern, readable font choices with proper sizing
- **Responsive Design**: Fully adaptive layout for all screen sizes

## Setup Instructions

1. **Clone or download** the repository
2. **Customize the content**:
   - Replace placeholder images with your own
   - Update text content in index.html
   - Modify colors in the CSS variables (in styles.css)
   - Add your own projects to the projects section
   - Update contact information and map location

3. **Testing**:
   - Open index.html in your browser to view the site
   - Test responsiveness using browser developer tools
   - Verify all links and form validation

4. **Deployment**:
   - Upload the files to your web hosting service
   - Alternatively, use GitHub Pages or Netlify for free hosting

## Customization Guide

### Changing Colors
The color scheme can be easily modified by changing the CSS variables at the top of the styles.css file:

```css
:root {
    --primary-color: #6c63ff;     /* Main accent color */
    --secondary-color: #4db5ff;    /* Secondary accent color */
    --dark-color: #2a2a2a;         /* Text and dark elements */
    --light-color: #f9f9f9;        /* Background and light elements */
    --gray-color: #767676;         /* Subtle text and borders */
    /* ... other variables ... */
}
```

### Adding Projects
To add a new project, copy the project card structure in the HTML and modify the content:

```html
<div class="project-card" data-category="your-category">
    <div class="project-img">
        <img src="path/to/your/image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
            <span>Technology 3</span>
        </div>
        <div class="project-links">
            <a href="#" class="btn btn-sm">View Demo</a>
            <a href="#" class="btn btn-sm btn-outline">Source Code</a>
        </div>
    </div>
</div>
```

### Updating Profile Picture
Replace the placeholder image in the hero section with your own:

```html
<div class="profile-img-container">
    <img src="path/to/your/profile-picture.jpg" alt="Your Name" class="profile-img">
</div>
```

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License
Feel free to use this template for your personal portfolio.

## Credits
- Font Awesome for icons
- Google Fonts for typography
- Google Maps for location embedding
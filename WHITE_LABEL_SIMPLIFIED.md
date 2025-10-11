# White Label Registration Page - Simplified Version

## Overview
The White Label Registration page has been simplified to contain only 4 essential elements as per requirements.

## Form Elements

### 1. Company Name Input
- **Type**: Text input field
- **Required**: Yes
- **Purpose**: Enter the company name for white label branding
- **Placeholder**: "Enter your company name"

### 2. Sub Domain Input
- **Type**: Text input field
- **Required**: Yes
- **Purpose**: Enter custom subdomain for white label registration
- **Placeholder**: "Enter subdomain"
- **Hint**: "Enter your custom subdomain"
- **Features**:
  - Simple text input without any suffix
  - User can enter full subdomain or URL as needed
  - No formatting restrictions on frontend

### 3. Logo Upload (SVG)
- **Type**: File input
- **Accept**: `.svg` and `image/svg+xml` only
- **Required**: Yes
- **Purpose**: Upload icon/square logo in SVG format
- **Recommended Size**: 200x200px
- **Features**:
  - File validation (only SVG files accepted)
  - Preview display after upload
  - Remove button to clear uploaded logo
  - Custom styled upload button with file name display

### 4. Full Logo Upload (SVG)
- **Type**: File input
- **Accept**: `.svg` and `image/svg+xml` only
- **Required**: Yes
- **Purpose**: Upload full horizontal logo with text in SVG format
- **Features**:
  - File validation (only SVG files accepted)
  - Preview display after upload
  - Remove button to clear uploaded logo
  - Custom styled upload button with file name display

## Component Structure

```jsx
WhiteLabelRegistration
├── Company Name (text input - required)
├── Sub Domain (text input - required)
├── Logo Upload (SVG file input - required)
└── Full Logo Upload (SVG file input - required)
```

## State Management

```javascript
const [formData, setFormData] = useState({
  companyName: '',
  subDomain: '',      // User enters subdomain manually
  logo: null,         // SVG file object
  fullLogo: null,     // SVG file object
});
```

## Key Features

### SVG File Validation
- Validates file type before upload
- Shows alert if non-SVG file is selected
- Prevents non-SVG files from being processed

### User-Editable Subdomain
- Simple text input field
- User can enter any subdomain value
- No client-side formatting or restrictions
- Validation handled on backend

### Logo Preview
- Shows preview of uploaded SVG files
- Background: white for contrast
- Size: max 120x120px with object-fit: contain
- Includes remove button to clear upload

### Form Actions
- **Reset Button**: Clears all form data and previews
- **Save Configuration Button**: Submits form (currently shows alert, API pending)

## Files Modified
1. `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.jsx`
   - Removed all unnecessary fields (colors, welcome message, terms, preview)
   - Simplified to 4 core elements
   - Added SVG validation
   - Removed unused state variables

2. `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.css`
   - Removed styles for removed elements (color pickers, preview section, URL input)
   - Added styles for subdomain display
   - Updated file input styling for better UX
   - Added upload icon styling

## Usage Example

```javascript
// User enters company name:
companyName: "HostBuddy Solutions"

// User enters subdomain:
subDomain: "hostbuddy-solutions.example.com"
// or any other format they need

// When SVG is uploaded:
logo: File { name: "company-icon.svg", type: "image/svg+xml", ... }

// Preview appears with remove button
```

## Form Submission

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form data:', formData);
  // TODO: API integration will be added later
};
```

### Expected Form Data
```javascript
{
  companyName: "HostBuddy Solutions",
  subDomain: "hostbuddy-solutions.hostbuddy.com",
  logo: File,      // SVG file object
  fullLogo: File   // SVG file object
}
```

## Validation Rules
1. **Company Name**: Required field
2. **Sub Domain**: Required field, free text input (no frontend validation)
3. **Logo**: Required, must be SVG format
4. **Full Logo**: Required, must be SVG format

### Backend Validation (Optional)
The subdomain field accepts any text input. Backend can implement validation as needed:
- URL format validation
- Subdomain availability checking
- Character restrictions
- Length limits

## Styling Highlights
- Dark theme with blue accents (#146EF5)
- Custom file upload button design
- SVG preview with white background for visibility
- Responsive design for mobile devices
- Smooth transitions and hover effects

## Future Enhancements (API Integration)
- POST request to save white label configuration
- File upload to cloud storage
- Subdomain availability checking
- Success/error notifications
- Loading states during submission

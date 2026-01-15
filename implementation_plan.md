# Implementation Plan - Profile Screen and Logout

We need to add a profile screen where the user can view their account information (email) and log out of the application.

## User Review Required
None

## Proposed Changes

### Navigation
#### [MODIFY] [catalog.tsx](file:///e:/Anigravity/Apps/SelfCareMeditation/src/app/(tabs)/catalog.tsx)
- Add `onPress` handler to the profile icon in the header.
- Navigate to `/profile`.

### Screens
#### [NEW] [profile.tsx](file:///e:/Anigravity/Apps/SelfCareMeditation/src/app/profile.tsx)
- Create a new screen `ProfileScreen`.
- Use `useAuth` hook to get `email` and `signOut` function.
- Display "Профиль" title.
- Display User Email.
- Add "Выйти" button using `Button` component.
- Handle logout: call `signOut`.

## Verification Plan

### Manual Verification
1.  **Open App**: Ensure you are logged in.
2.  **Navigate to Profile**: Click the profile icon in the top right corner of the Catalog screen.
3.  **Verify UI**: 
    - Check if the "Профиль" screen opens.
    - Check if the correct email is displayed.
4.  **Logout**: Click the "Выйти" button.
5.  **Verify Logout**: 
    - Check if the app redirects to the Login/Welcome screen.
    - Try to restart the app and verify you are still logged out.

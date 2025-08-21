# Admin Setup Guide

This guide will help you set up the first admin user for your community platform.

## Prerequisites

- Supabase project configured
- Database schema updated with admin functionality
- At least one user account created

## Step 1: Create Your First User Account

1. Go to your community platform
2. Sign up for a new account with your email
3. Complete the registration process
4. Verify your email if required

## Step 2: Set Up Admin Privileges

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the following SQL command:

```sql
-- Replace 'your-email@example.com' with your actual email address
UPDATE public.profiles 
SET 
    is_admin = true, 
    is_approved = true, 
    approval_status = 'approved',
    is_verified = true
WHERE email = 'your-email@example.com';
```

## Step 3: Verify Admin Access

1. Sign out of your account
2. Sign back in
3. You should now see an "Admin" link in the navigation
4. Click on "Admin" to access the admin dashboard

## Step 4: Test Admin Functionality

1. In the admin dashboard, you should see:
   - Statistics about pending registrations
   - List of pending user registrations
   - Ability to approve/reject users
2. Try approving a test user registration

## Admin Features Available

### User Management
- **View Pending Registrations**: See all users waiting for approval
- **Approve Users**: Grant access to approved community members
- **Reject Users**: Deny access with optional notes
- **Search & Filter**: Find specific users quickly

### Security Features
- **Admin-Only Access**: Only users with `is_admin = true` can access
- **Audit Trail**: Track who approved/rejected each user
- **Notes System**: Add context to approval decisions

### Dashboard Statistics
- **Pending Count**: Number of users awaiting approval
- **Approved Count**: Number of approved users
- **Rejected Count**: Number of rejected users
- **Total Count**: Overall registration count

## Important Notes

1. **First Admin**: You must manually set the first admin user via SQL
2. **Security**: Admin privileges are powerful - use them responsibly
3. **Backup**: Consider backing up your database before making changes
4. **Testing**: Test the approval process with a test account first

## Troubleshooting

### "Access Denied" Error
- Ensure your user has `is_admin = true` in the database
- Check that you're signed in with the correct account

### No Pending Users Showing
- Verify that new registrations have `approval_status = 'pending'`
- Check that the `handle_new_user` function is working correctly

### Functions Not Working
- Ensure all SQL functions were created successfully
- Check Supabase logs for any error messages

## Next Steps

After setting up admin access:

1. **Review Pending Registrations**: Check all waiting users
2. **Set Approval Standards**: Establish criteria for user approval
3. **Train Team Members**: If you have multiple admins, train them on the process
4. **Monitor Activity**: Regularly check the admin dashboard for new registrations

Your admin dashboard is now ready to manage community access! 🎉


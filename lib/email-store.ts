import { createClient } from '@supabase/supabase-js';

// Define the shape of our email submission data
export interface EmailSubmission {
  id?: string;
  email: string;
  timestamp: string;
  user_agent?: string; // Using snake_case to match database column names
  referer?: string;
}

// Create a Supabase client for server-side usage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * EmailStore class that uses Supabase as a backend
 */
class EmailStore {
  private static instance: EmailStore;
  private tableName = 'email_submissions';
  
  private constructor() {
    // Ensure the table exists (this is a simple check, ideally you'd use migrations)
    this.initializeTable().catch(error => 
      console.error('Failed to initialize email submissions table:', error)
    );
  }
  
  public static getInstance(): EmailStore {
    if (!EmailStore.instance) {
      EmailStore.instance = new EmailStore();
    }
    return EmailStore.instance;
  }
  
  /**
   * Initialize the email_submissions table if it doesn't exist
   */
  private async initializeTable(): Promise<void> {
    try {
      // Check if the table exists by querying it
      const { error } = await supabase
        .from(this.tableName)
        .select('id', { count: 'exact', head: true });
      
      if (error && error.code === '42P01') { // Table doesn't exist code
        console.log('Email submissions table does not exist. Creating...');
        
        // In production, you should use Supabase migrations instead
        // This is just for demonstration purposes
        const { error: createError } = await supabase.rpc('create_email_submissions_table');
        
        if (createError) {
          console.error('Failed to create table:', createError);
        }
      }
    } catch (error) {
      console.error('Error checking/creating table:', error);
    }
  }
  
  /**
   * Add a new email submission to the database
   */
  public async addSubmission(submission: EmailSubmission): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .insert([submission]);
      
      if (error) {
        console.error('Error inserting email submission:', error);
        throw error;
      }
      
      console.log(`Email stored in Supabase: ${submission.email} at ${submission.timestamp}`);
    } catch (error) {
      console.error('Failed to store email in Supabase:', error);
      throw error;
    }
  }
  
  /**
   * Get all email submissions
   */
  public async getAllSubmissions(): Promise<EmailSubmission[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) {
        console.error('Error fetching email submissions:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Failed to get email submissions:', error);
      return [];
    }
  }
  
  /**
   * Get sorted submissions (newest first)
   */
  public async getSubmissionsSorted(): Promise<EmailSubmission[]> {
    return this.getAllSubmissions();
  }
}

export const emailStore = EmailStore.getInstance();

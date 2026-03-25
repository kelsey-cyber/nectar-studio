import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export class TemplateStorage {
  // Save template to Supabase
  async saveTemplate(template) {
    try {
      const { data, error } = await supabase
        .from('templates')
        .insert([{
          name: template.name,
          category: template.category,
          schema: template
        }])
        .select()
      
      if (error) throw error
      console.log('✅ Template saved:', data[0].name)
      return { data: data[0], error: null }
    } catch (error) {
      console.error('❌ Save template error:', error)
      return { data: null, error }
    }
  }

  // Load all templates or by category
  async loadTemplates(category = null) {
    try {
      let query = supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      
      if (category) {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      console.log(`✅ Loaded ${data.length} templates`)
      return { data, error: null }
    } catch (error) {
      console.error('❌ Load templates error:', error)
      return { data: null, error }
    }
  }

  // Update existing template
  async updateTemplate(id, updates) {
    try {
      const { data, error } = await supabase
        .from('templates')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
      
      if (error) throw error
      console.log('✅ Template updated:', data[0].name)
      return { data: data[0], error: null }
    } catch (error) {
      console.error('❌ Update template error:', error)
      return { data: null, error }
    }
  }

  // Delete template (soft delete)
  async deleteTemplate(id) {
    try {
      const { data, error } = await supabase
        .from('templates')
        .update({ is_active: false })
        .eq('id', id)
        .select()
      
      if (error) throw error
      console.log('✅ Template deleted:', data[0].name)
      return { data: data[0], error: null }
    } catch (error) {
      console.error('❌ Delete template error:', error)
      return { data: null, error }
    }
  }

  // Get template by ID
  async getTemplate(id) {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('❌ Get template error:', error)
      return { data: null, error }
    }
  }
}

// Export singleton instance
export const templateStorage = new TemplateStorage()
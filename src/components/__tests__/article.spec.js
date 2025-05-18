import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Article from '../Article.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useArticlesStore } from "../../store/pinia_index.js"


vi.mock('primevue/useconfirm', () => ({
  useConfirm: vi.fn(() => ({
    require: vi.fn()
  }))
}))

describe('Article tests', () => {
  let wrapper
  let store = useArticlesStore()
  let pinia = createPinia()

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    store.updateArticleStatus = vi.fn().mockResolvedValue(true)

    wrapper = mount(Article, {
      props: {
        title: 'Test Article',
        author: 'Test Author',
        isPublished: true,
        id: 1
      },
      global: {
        plugins: [
          pinia,
          PrimeVue,
          ToastService,
          ConfirmationService
        ],
        components: {
          Button,
          Toast,
          ConfirmDialog
        }
      }
    })
  })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('title check', () => {
    expect(wrapper.find('h2').text()).toBe('Test Article')
  })

  it('author name in uppercase', () => {
    expect(wrapper.find('p').text()).toBe('TEST AUTHOR')
  })

  it('article status isPublished', () => {
    expect(wrapper.text()).toContain('Опубликована')
  })

  it('article status isPublished false', async () => {
    await wrapper.setProps({ isPublished: false })
    expect(wrapper.text()).toContain('Не опубликована')
  })
})
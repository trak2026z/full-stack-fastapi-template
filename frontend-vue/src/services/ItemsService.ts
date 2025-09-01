import { ItemsService as GeneratedItemsService } from '@/client'
import type {
  ItemsReadItemsResponse,
  ItemsCreateItemData,
  ItemsCreateItemResponse,
  ItemsUpdateItemData,
  ItemsUpdateItemResponse,
  ItemsDeleteItemData,
  ItemsDeleteItemResponse,
} from '@/client'

export class ItemsService {
  static async readItems(): Promise<ItemsReadItemsResponse> {
    return GeneratedItemsService.readItems()
  }

  static async createItem(data: ItemsCreateItemData): Promise<ItemsCreateItemResponse> {
    return GeneratedItemsService.createItem(data)
  }

  static async updateItem(data: ItemsUpdateItemData): Promise<ItemsUpdateItemResponse> {
    return GeneratedItemsService.updateItem(data)
  }

  static async deleteItem(data: ItemsDeleteItemData): Promise<ItemsDeleteItemResponse> {
    return GeneratedItemsService.deleteItem(data)
  }
}

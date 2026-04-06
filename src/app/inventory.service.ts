import { Injectable } from '@angular/core';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventory: InventoryItem[] = [
    {
      id: 1,
      name: 'Item 1',
      description: 'First item in inventory',
      quantity: 10,
      price: 100
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Second item in inventory',
      quantity: 20,
      price: 200
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Third item in inventory',
      quantity: 15,
      price: 150
    }
  ];

  getInventory(): InventoryItem[] {
    return this.inventory;
  }

  getItemByName(name: string): InventoryItem | undefined {
    return this.inventory.find(item => item.name === name);
  }

  addItem(item: Omit<InventoryItem, 'id'>): InventoryItem {
    const newItem: InventoryItem = {
      ...item,
      id: this.inventory.length + 1
    };
    this.inventory.push(newItem);
    return newItem;
  }

  updateItem(id: number, updatedItem: Partial<InventoryItem>): InventoryItem | undefined {
    const index = this.inventory.findIndex(item => item.id === id);
    if (index !== -1) {
      this.inventory[index] = {
        ...this.inventory[index],
        ...updatedItem
      };
      return this.inventory[index];
    }
    return undefined;
  }

  deleteItem(name: string): boolean {
    const index = this.inventory.findIndex(item => item.name === name);
    if (index !== -1) {
      this.inventory.splice(index, 1);
      return true;
    }
    return false;
  }

  searchItems(query: string): InventoryItem[] {
    return this.inventory.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  getPopularItems(): InventoryItem[] {
    return this.inventory.sort((a, b) => b.quantity - a.quantity).slice(0, 3);
  }
}

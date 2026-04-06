import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from './inventory.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'inventory-management-app';
  
  // Inventory Management
  inventory: InventoryItem[] = [];
  newItem: Omit<InventoryItem, 'id'> = { name: '', description: '', quantity: 1, price: 0 };
  editingItem: InventoryItem | null = null;
  
  // Search
  searchQuery: string = '';
  searchResults: InventoryItem[] = [];
  
  // Statistics
  totalItems: number = 0;
  totalQuantity: number = 0;
  totalValue: number = 0;
  popularItems: InventoryItem[] = [];
  
  // UI State
  activeTab: string = 'inventory';
  
  constructor(private inventoryService: InventoryService) { }
  
  ngOnInit(): void {
    this.loadInventory();
    this.calculateStatistics();
  }
  
  loadInventory(): void {
    this.inventory = this.inventoryService.getInventory();
  }
  
  calculateStatistics(): void {
    const inventory = this.inventoryService.getInventory();
    this.totalItems = inventory.length;
    this.totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
    this.totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    this.popularItems = this.inventoryService.getPopularItems();
  }
  
  addItem(): void {
    if (this.newItem.name && this.newItem.description) {
      this.inventoryService.addItem(this.newItem);
      this.loadInventory();
      this.calculateStatistics();
      this.newItem = { name: '', description: '', quantity: 1, price: 0 };
    }
  }
  
  editItem(item: InventoryItem): void {
    this.editingItem = { ...item };
  }
  
  updateItem(): void {
    if (this.editingItem) {
      this.inventoryService.updateItem(this.editingItem.id, this.editingItem);
      this.loadInventory();
      this.calculateStatistics();
      this.editingItem = null;
    }
  }
  
  deleteItem(name: string): void {
    this.inventoryService.deleteItem(name);
    this.loadInventory();
    this.calculateStatistics();
  }
  
  searchItems(): void {
    this.searchResults = this.inventoryService.searchItems(this.searchQuery);
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}

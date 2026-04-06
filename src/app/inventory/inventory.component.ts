import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  filteredInventory: InventoryItem[] = [];
  newItem: Omit<InventoryItem, 'id'> = {
    name: '',
    description: '',
    quantity: 1,
    price: 0
  };
  editingItem: InventoryItem | null = null;
  searchQuery: string = '';
  sortBy: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  selectedItems: string[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventory = this.inventoryService.getInventory();
    this.filterAndSortInventory();
  }

  filterAndSortInventory(): void {
    // Filter by search query
    this.filteredInventory = this.inventory.filter(item => 
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Sort by selected field
    this.filteredInventory.sort((a, b) => {
      let aValue = a[this.sortBy as keyof InventoryItem];
      let bValue = b[this.sortBy as keyof InventoryItem];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortOrder === 'asc' ? 
          aValue.localeCompare(bValue) : 
          bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortOrder === 'asc' ? 
          aValue - bValue : 
          bValue - aValue;
      }
      return 0;
    });
  }

  addItem(): void {
    this.inventoryService.addItem(this.newItem);
    this.loadInventory();
    // Reset form
    this.newItem = {
      name: '',
      description: '',
      quantity: 1,
      price: 0
    };
  }

  editItem(item: InventoryItem): void {
    this.editingItem = { ...item };
  }

  updateItem(): void {
    if (this.editingItem) {
      this.inventoryService.updateItem(this.editingItem.id, this.editingItem);
      this.loadInventory();
      this.editingItem = null;
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.inventoryService.deleteItem(name);
      this.loadInventory();
      // Remove from selected items if present
      this.selectedItems = this.selectedItems.filter(itemName => itemName !== name);
    }
  }

  toggleItemSelection(name: string): void {
    const index = this.selectedItems.indexOf(name);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(name);
    }
  }

  selectAllItems(): void {
    if (this.selectedItems.length === this.filteredInventory.length) {
      this.selectedItems = [];
    } else {
      this.selectedItems = this.filteredInventory.map(item => item.name);
    }
  }

  deleteSelectedItems(): void {
    if (this.selectedItems.length > 0 && confirm(`Are you sure you want to delete ${this.selectedItems.length} items?`)) {
      this.selectedItems.forEach(name => {
        this.inventoryService.deleteItem(name);
      });
      this.loadInventory();
      this.selectedItems = [];
    }
  }

  isItemSelected(name: string): boolean {
    return this.selectedItems.includes(name);
  }

  isAllSelected(): boolean {
    return this.filteredInventory.length > 0 && this.selectedItems.length === this.filteredInventory.length;
  }

  onSearchChange(): void {
    this.filterAndSortInventory();
  }

  onSortChange(): void {
    this.filterAndSortInventory();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.filterAndSortInventory();
  }
}

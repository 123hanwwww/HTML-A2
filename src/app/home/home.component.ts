import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularItems: InventoryItem[] = [];
  totalItems: number = 0;
  totalQuantity: number = 0;
  totalValue: number = 0;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.popularItems = this.inventoryService.getPopularItems();
    this.calculateStatistics();
  }

  calculateStatistics(): void {
    const inventory = this.inventoryService.getInventory();
    this.totalItems = inventory.length;
    this.totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
    this.totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    this.searchResults = this.inventoryService.searchItems(this.searchQuery);
  }
}

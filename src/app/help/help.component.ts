import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'all';
  expandedFAQs: number[] = [];
  faqs: FAQ[] = [];
  filteredFAQs: FAQ[] = [];

  ngOnInit(): void {
    this.initializeFAQs();
    this.filterFAQs();
  }

  initializeFAQs(): void {
    this.faqs = [
      {
        id: 1,
        question: 'How do I add a new inventory item?',
        answer: 'Navigate to the Inventory page, fill out the "Add New Item" form with the item details, and click the "Add Item" button.',
        category: 'inventory'
      },
      {
        id: 2,
        question: 'How do I edit an existing item?',
        answer: 'On the Inventory page, find the item you want to edit and click the "Edit" button. Make your changes in the edit form and click "Update Item" to save.',
        category: 'inventory'
      },
      {
        id: 3,
        question: 'How do I delete an item?',
        answer: 'On the Inventory page, find the item you want to delete and click the "Delete" button. Confirm the deletion in the pop-up dialog.',
        category: 'inventory'
      },
      {
        id: 4,
        question: 'How do I search for items?',
        answer: 'Navigate to the Search page, enter your search query in the search box, and press Enter or click the "Search" button.',
        category: 'search'
      },
      {
        id: 5,
        question: 'Why can\'t I add an item?',
        answer: 'Make sure all required fields are filled out correctly. Quantity and price must be valid numbers, and all fields must be completed.',
        category: 'inventory'
      },
      {
        id: 6,
        question: 'Item not showing up in inventory',
        answer: 'Check if the item was successfully added by refreshing the Inventory page. If the issue persists, try clearing your browser cache.',
        category: 'troubleshooting'
      },
      {
        id: 7,
        question: 'Search not returning results',
        answer: 'Make sure your search query is spelled correctly. Try using different keywords or partial names to find the item.',
        category: 'search'
      },
      {
        id: 8,
        question: 'Form submission errors',
        answer: 'Ensure all form fields are filled out correctly. Numeric fields should only contain numbers, and all required fields must be completed.',
        category: 'troubleshooting'
      },
      {
        id: 9,
        question: 'Navigation issues',
        answer: 'If you\'re having trouble navigating between pages, try refreshing the browser or clearing your cache. If the problem continues, restart the application.',
        category: 'troubleshooting'
      },
      {
        id: 10,
        question: 'How do I sort inventory items?',
        answer: 'On the Inventory page, use the "Sort by" dropdown menu to select the field you want to sort by, and click the sort order button to toggle between ascending and descending order.',
        category: 'inventory'
      },
      {
        id: 11,
        question: 'How do I use the price range filter?',
        answer: 'On the Search page, enter the minimum and maximum price values in the price range fields, then click the Search button to filter results.',
        category: 'search'
      },
      {
        id: 12,
        question: 'What is the maximum number of items I can add?',
        answer: 'There is no fixed limit to the number of items you can add, but performance may decrease with very large inventories.',
        category: 'general'
      },
      {
        id: 13,
        question: 'How do I perform bulk operations?',
        answer: 'On the Inventory page, select multiple items using the checkboxes, then click the "Delete Selected" button to delete all selected items at once.',
        category: 'inventory'
      },
      {
        id: 14,
        question: 'Is my data secure?',
        answer: 'Yes, all inventory data is stored locally in the application and is not sent to any external servers. No personal information is collected or stored.',
        category: 'general'
      },
      {
        id: 15,
        question: 'How do I refresh the inventory list?',
        answer: 'The inventory list automatically updates when you add, edit, or delete items. You can also manually refresh the page if needed.',
        category: 'inventory'
      }
    ];
  }

  filterFAQs(): void {
    this.filteredFAQs = this.faqs.filter(faq => {
      const matchesCategory = this.selectedCategory === 'all' || faq.category === this.selectedCategory;
      const matchesSearch = this.searchQuery === '' || 
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFAQs();
  }

  toggleFAQ(id: number): void {
    const index = this.expandedFAQs.indexOf(id);
    if (index === -1) {
      this.expandedFAQs.push(id);
    } else {
      this.expandedFAQs.splice(index, 1);
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterFAQs();
  }
}


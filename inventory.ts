// ============================================
// Author: [你的名字]
// Assignment: PROG2005 A2 - Part 1 (TypeScript)
// Description: Inventory Management System
// ============================================

// ---------- 类型定义 ----------
interface InventoryItem {
    itemId: string;
    itemName: string;
    category: string;
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: string;
    popularItem: string;   // "Yes" / "No"
    comment?: string;
}

// ---------- 全局数据 ----------
let inventory: InventoryItem[] = [];

// ---------- 辅助函数 ----------
function displayMessage(msg: string, isError = false): void {
    const outputDiv = document.getElementById("output") as HTMLDivElement;
    if (!outputDiv) return;
    outputDiv.innerHTML = `<div style="color:${isError ? '#dc2626' : '#16a34a'}; background:#f0fdf4; padding:12px; border-radius:12px; margin-bottom:16px;">${msg}</div>`;

    // 3秒后自动清除消息（但不清除表格）
    setTimeout(() => {
        const currentMsg = outputDiv.querySelector('div');
        if (currentMsg && !currentMsg.innerHTML.includes('table')) {
            currentMsg.remove();
        }
    }, 3000);
}

// 渲染表格
function renderTable(items: InventoryItem[]): void {
    const outputDiv = document.getElementById("output") as HTMLDivElement;
    if (!outputDiv) return;

    if (items.length === 0) {
        outputDiv.innerHTML = "<p style='text-align:center; color:#6b7280;'>📭 No items found.</p>";
        return;
    }

    let html = `<div style="overflow-x: auto;">
        <table style="width:100%; border-collapse:collapse; background:white; border-radius:12px; overflow:hidden;">
        <thead style="background:#1e293b; color:white;">
            <tr>
                <th style="padding:12px;">ID</th>
                <th style="padding:12px;">Name</th>
                <th style="padding:12px;">Category</th>
                <th style="padding:12px;">Qty</th>
                <th style="padding:12px;">Price</th>
                <th style="padding:12px;">Supplier</th>
                <th style="padding:12px;">Stock</th>
                <th style="padding:12px;">Popular</th>
                <th style="padding:12px;">Comment</th>
            </tr>
        </thead>
        <tbody>`;

    for (let item of items) {
        html += `<tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:10px;">${escapeHtml(item.itemId)}</td>
            <td style="padding:10px; font-weight:500;">${escapeHtml(item.itemName)}</td>
            <td style="padding:10px;">${escapeHtml(item.category)}</td>
            <td style="padding:10px; text-align:center;">${item.quantity}</td>
            <td style="padding:10px;">$${item.price.toFixed(2)}</td>
            <td style="padding:10px;">${escapeHtml(item.supplierName)}</td>
            <td style="padding:10px;">
                <span style="padding:4px 8px; border-radius:20px; font-size:0.85rem;
                    ${item.stockStatus === 'In Stock' ? 'background:#dbeafe; color:#1e40af;' :
                      item.stockStatus === 'Low Stock' ? 'background:#fed7aa; color:#92400e;' :
                      'background:#fee2e2; color:#991b1b;'}">
                    ${item.stockStatus}
                </span>
            </td>
            <td style="padding:10px; text-align:center;">${item.popularItem === 'Yes' ? '⭐' : '○'}</td>
            <td style="padding:10px;">${escapeHtml(item.comment || '-')}</td>
        </tr>`;
    }
    html += `</tbody></table></div>`;
    outputDiv.innerHTML = html;
}

// 简单的防XSS
function escapeHtml(str: string): string {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// 清空表单
function clearForm(): void {
    (document.getElementById("itemId") as HTMLInputElement).value = '';
    (document.getElementById("itemName") as HTMLInputElement).value = '';
    (document.getElementById("category") as HTMLSelectElement).value = 'Electronics';
    (document.getElementById("quantity") as HTMLInputElement).value = '';
    (document.getElementById("price") as HTMLInputElement).value = '';
    (document.getElementById("supplier") as HTMLInputElement).value = '';
    (document.getElementById("stockStatus") as HTMLSelectElement).value = 'In Stock';
    (document.getElementById("popularItem") as HTMLSelectElement).value = 'No';
    (document.getElementById("comment") as HTMLInputElement).value = '';
    (document.getElementById("searchName") as HTMLInputElement).value = '';
    (document.getElementById("deleteName") as HTMLInputElement).value = '';
}

// 获取表单数据
function getFormData(): InventoryItem {
    return {
        itemId: (document.getElementById("itemId") as HTMLInputElement).value.trim(),
        itemName: (document.getElementById("itemName") as HTMLInputElement).value.trim(),
        category: (document.getElementById("category") as HTMLSelectElement).value,
        quantity: parseInt((document.getElementById("quantity") as HTMLInputElement).value) || 0,
        price: parseFloat((document.getElementById("price") as HTMLInputElement).value) || 0,
        supplierName: (document.getElementById("supplier") as HTMLInputElement).value.trim(),
        stockStatus: (document.getElementById("stockStatus") as HTMLSelectElement).value,
        popularItem: (document.getElementById("popularItem") as HTMLSelectElement).value,
        comment: (document.getElementById("comment") as HTMLInputElement).value.trim() || undefined
    };
}

// ---------- CRUD 核心功能 ----------
function addItem(item: InventoryItem): boolean {
    // 验证必填字段
    if (!item.itemId || !item.itemName || !item.supplierName) {
        displayMessage("❌ Please fill ID, Name, and Supplier fields.", true);
        return false;
    }
    if (item.quantity <= 0) {
        displayMessage("❌ Quantity must be greater than 0.", true);
        return false;
    }
    if (item.price <= 0) {
        displayMessage("❌ Price must be greater than 0.", true);
        return false;
    }

    // 唯一性校验
    const exists = inventory.some(i => i.itemId === item.itemId);
    if (exists) {
        displayMessage(`❌ Item ID "${item.itemId}" already exists!`, true);
        return false;
    }

    inventory.push(item);
    displayMessage(`✅ Item "${item.itemName}" added successfully.`);
    clearForm();
    return true;
}

function updateItemByName(itemName: string, updatedData: Partial<InventoryItem>): boolean {
    if (!itemName) {
        displayMessage("❌ Please enter an item name to update.", true);
        return false;
    }

    const index = inventory.findIndex(i => i.itemName.toLowerCase() === itemName.toLowerCase());
    if (index === -1) {
        displayMessage(`❌ Item "${itemName}" not found.`, true);
        return false;
    }

    // 如果更新 ID，需检查唯一性
    if (updatedData.itemId && updatedData.itemId !== inventory[index].itemId) {
        const idExists = inventory.some(i => i.itemId === updatedData.itemId);
        if (idExists) {
            displayMessage(`❌ ID "${updatedData.itemId}" already exists.`, true);
            return false;
        }
    }

    inventory[index] = { ...inventory[index], ...updatedData };
    displayMessage(`✏️ Item "${itemName}" updated successfully.`);
    clearForm();
    return true;
}

function deleteItemByName(itemName: string): boolean {
    if (!itemName) {
        displayMessage("❌ Please enter an item name to delete.", true);
        return false;
    }

    const index = inventory.findIndex(i => i.itemName.toLowerCase() === itemName.toLowerCase());
    if (index === -1) {
        displayMessage(`❌ Item "${itemName}" not found.`, true);
        return false;
    }

    const confirmDel = confirm(`⚠️ Are you sure you want to delete "${itemName}" permanently?`);
    if (confirmDel) {
        inventory.splice(index, 1);
        displayMessage(`🗑️ Item "${itemName}" deleted successfully.`);
        clearForm();
        renderTable(inventory);
        return true;
    }
    return false;
}

function searchItemsByName(searchTerm: string): InventoryItem[] {
    if (!searchTerm) {
        displayMessage("🔍 Please enter a search term.", true);
        return inventory;
    }
    const results = inventory.filter(i => i.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    if (results.length === 0) {
        displayMessage(`🔍 No items found matching "${searchTerm}".`, true);
    }
    return results;
}

// ---------- UI 事件绑定 ----------
document.addEventListener("DOMContentLoaded", () => {
    // 初始化示例数据
    const sampleData: InventoryItem[] = [
        {
            itemId: "1001",
            itemName: "Gaming Laptop",
            category: "Electronics",
            quantity: 10,
            price: 1299.99,
            supplierName: "TechCorp",
            stockStatus: "In Stock",
            popularItem: "Yes",
            comment: "High demand item"
        },
        {
            itemId: "1002",
            itemName: "Office Chair",
            category: "Furniture",
            quantity: 5,
            price: 299.99,
            supplierName: "FurnitureWorld",
            stockStatus: "Low Stock",
            popularItem: "Yes",
            comment: "Best seller"
        },
        {
            itemId: "1003",
            itemName: "Cotton T-Shirt",
            category: "Clothing",
            quantity: 0,
            price: 19.99,
            supplierName: "FashionHub",
            stockStatus: "Out of Stock",
            popularItem: "No",
            comment: "Restocking next month"
        }
    ];
    inventory = sampleData;
    renderTable(inventory);

    // 获取 DOM 元素
    const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
    const updateBtn = document.getElementById("updateBtn") as HTMLButtonElement;
    const deleteBtn = document.getElementById("deleteBtn") as HTMLButtonElement;
    const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    const showAllBtn = document.getElementById("showAllBtn") as HTMLButtonElement;
    const showPopularBtn = document.getElementById("showPopularBtn") as HTMLButtonElement;

    // 添加按钮
    addBtn.addEventListener("click", () => {
        const newItem = getFormData();
        if (addItem(newItem)) {
            renderTable(inventory);
        }
    });

    // 更新按钮（弹出对话框输入要更新的物品名称）
    updateBtn.addEventListener("click", () => {
        const targetName = prompt("📝 Enter the Item Name to update:", "");
        if (!targetName) return;

        // 获取当前表单中填写的新数据
        const updatedData: Partial<InventoryItem> = {};
        const formData = getFormData();

        if (formData.itemId) updatedData.itemId = formData.itemId;
        if (formData.itemName) updatedData.itemName = formData.itemName;
        if (formData.category) updatedData.category = formData.category;
        if (formData.quantity > 0) updatedData.quantity = formData.quantity;
        if (formData.price > 0) updatedData.price = formData.price;
        if (formData.supplierName) updatedData.supplierName = formData.supplierName;
        if (formData.stockStatus) updatedData.stockStatus = formData.stockStatus;
        if (formData.popularItem) updatedData.popularItem = formData.popularItem;
        if (formData.comment !== undefined) updatedData.comment = formData.comment;

        if (updateItemByName(targetName, updatedData)) {
            renderTable(inventory);
        }
    });

    // 删除按钮
    deleteBtn.addEventListener("click", () => {
        const deleteInput = document.getElementById("deleteName") as HTMLInputElement;
        const nameToDelete = deleteInput.value.trim();
        if (deleteItemByName(nameToDelete)) {
            renderTable(inventory);
            deleteInput.value = '';
        }
    });

    // 搜索按钮
    searchBtn.addEventListener("click", () => {
        const searchInput = document.getElementById("searchName") as HTMLInputElement;
        const searchTerm = searchInput.value.trim();
        const results = searchItemsByName(searchTerm);
        renderTable(results);
    });

    // 显示全部按钮
    showAllBtn.addEventListener("click", () => {
        renderTable(inventory);
        const searchInput = document.getElementById("searchName") as HTMLInputElement;
        searchInput.value = '';
    });

    // 显示热门按钮
    showPopularBtn.addEventListener("click", () => {
        const populars = inventory.filter(i => i.popularItem === "Yes");
        if (populars.length === 0) {
            displayMessage("⭐ No popular items found.", true);
        }
        renderTable(populars);
    });
});
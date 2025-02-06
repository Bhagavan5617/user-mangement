import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  isUpdateButtonShow: boolean = false;
  searchText: string = ''; 
  currentPage: number = 1; 
  pageSize: number = 5;

  user: any = {
    id: null,
    name: '',
    email: '',
    mobile: '',
    age: '',
    address: '',
    role: 'user',
  };
  
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'johndoe@mail.com', mobile: '9876543210', age: '28', address: 'Mumbai, IND', role: 'admin' },
    { id: 2, name: 'Alice Smith', email: 'alice@mail.com', mobile: '8765432109', age: '25', address: 'Delhi, IND', role: 'user' },
    { id: 3, name: 'Robert Brown', email: 'robert@mail.com', mobile: '7654321098', age: '30', address: 'Chennai, IND', role: 'user' },
    { id: 4, name: 'Emily Davis', email: 'emily@mail.com', mobile: '6543210987', age: '26', address: 'Bangalore, IND', role: 'user' },
    { id: 5, name: 'Michael Wilson', email: 'michael@mail.com', mobile: '5432109876', age: '32', address: 'Hyderabad, IND', role: 'admin' },
    { id: 6, name: 'Sophia Martinez', email: 'sophia@mail.com', mobile: '4321098765', age: '27', address: 'Kolkata, IND', role: 'user' },
    { id: 7, name: 'Daniel Anderson', email: 'daniel@mail.com', mobile: '3210987654', age: '29', address: 'Pune, IND', role: 'admin' },
    { id: 8, name: 'Olivia Thomas', email: 'olivia@mail.com', mobile: '2109876543', age: '24', address: 'Ahmedabad, IND', role: 'user' },
    { id: 9, name: 'James Taylor', email: 'james@mail.com', mobile: '1098765432', age: '31', address: 'Jaipur, IND', role: 'user' },
    { id: 10, name: 'Isabella White', email: 'isabella@mail.com', mobile: '9988776655', age: '23', address: 'Lucknow, IND', role: 'user' },
  ];
  

  submit() {
    if (this.user.name && this.user.email && this.user.mobile && this.user.age && this.user.address) {
      this.user.id = this.users.length + 1;
      this.users.push({ ...this.user });
      console.log(this.users);
      this.resetUser();
    } else {
      alert('Please enter all the fields');
    }
    return false;
  }

  updateuser() {
    const index = this.users.findIndex((u: any) => u.id === this.user.id);
    if (index !== -1) {
      this.users[index] = { ...this.user };
      this.isUpdateButtonShow = false;
      this.resetUser();
    }
  }

  editUser(id: any) {
    const user = this.users.find((u: any) => u.id === id);
    if (user) {
      this.user = { ...user };
      this.isUpdateButtonShow = true;
    }
  }

  deleteUser(id: any) {
    const userId = this.users.findIndex((u: any) => u.id === id);
    if (userId != -1) {
      this.users.splice(userId, 1);
    }
  }

  resetUser() {
    this.user = { id: null, name: '', email: '', mobile: '', age: '', address: '' };
  }

  get filteredUsers() {
    let filtered = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.mobile.includes(this.searchText)
    );

    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

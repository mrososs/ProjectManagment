import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: User | null = null;
  userName: string = 'User';
  userMail: string = 'upskilling@gmail.com'
  defaultImage = '../../../../assets/img/user.png';
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private helperService: HelperService,
  ) {}
  ngOnInit(): void {
    this.helperService.currentProfileImage.subscribe(image => {
      if (image) this.defaultImage = image;
    });

    this.helperService.currentUserName.subscribe(name => {
      if (name) this.userName = name;
    });
      
    this.helperService.currentUserMail.subscribe(email => {
      if (email) this.userMail = email;
    });

    this.helperService.getCurrentUser().subscribe({
      next: (userData) => {
        const fullImagePath = userData.imagePath 
          ? `https://upskilling-egypt.com:3003/${userData.imagePath}`
          : this.defaultImage;

        this.user = { ...userData, imagePath: fullImagePath };

        this.helperService.updateProfileImage(fullImagePath);
        this.helperService.updateUserName(userData.userName);
        this.helperService.updateUserMail(userData.email)
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }
}

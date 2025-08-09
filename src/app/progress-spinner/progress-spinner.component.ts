import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule,CommonModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.css'
})
export class ProgressSpinnerComponent {
  
  @Input() progressSpiner!:boolean;

}

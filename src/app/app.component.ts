import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
export type AppTheme = 'vm' | 'o2' | 'vm-app' | 'o2-app' | 'vmo2' | 'vmo2-app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterModule],
})
export class AppComponent {
}

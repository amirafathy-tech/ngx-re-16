import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { ShellbarComponent, ShellbarLogoComponent, ShellbarSidenavDirective } from '@fundamental-ngx/core/shellbar';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar.component.html',
    styleUrls: ['./shellbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        ShellbarComponent,
        ButtonComponent,
        ShellbarSidenavDirective,
        ShellbarLogoComponent,
        SideNavigationModule,
        NestedListModule,
        LayoutPanelModule
    ]
})
export class ShellbarSideNavComponent {
    condensed = false;
userMenu: any;
user: any;
productMenuControl: any;
productMenuItems: any;
}
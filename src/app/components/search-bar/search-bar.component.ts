import {Component, HostBinding} from "@angular/core";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {LoadingComponent} from "@/components/loading";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
    imports: [
        CurrencyPipe,
        LoadingComponent,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    standalone: true


})

export class SearchBarComponent {

    @HostBinding('class.search-bar')
    protected readonly hbClass = true;

    inputFocus: boolean = false;
    searchText: string = '';
    searchDeBounce: any;
    listings: any = [];
    searchLoading = false;
    searchingText = 'Searching';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    setFocus() {
        this.inputFocus = true;
    }

    setBlur() {
        this.inputFocus = false;
    }

    search(event: any) {
        clearTimeout(this.searchDeBounce);

        if (event.key === 'Escape') {
            setTimeout(() => {
                this.listings = [];
            }, 500);
            this.searchLoading = false;
            event.target.blur();
        }

        if (event.key === 'Enter') {
            this.listings = [];
            this.searchLoading = false;
            alert('Search for ' + event.target.value);
        } else {
            this.searchDeBounce = setTimeout(() => {
                let searchValue = event.target.value;
                this.searchLoading = true;
                this.listings = [];
                this.searchingText = 'Searching';
                setTimeout(() => {
                    this.searchingText = 'Still searching';
                }, 3000);
                setTimeout(() => {
                    this.searchingText = 'Please wait. Still searching';
                }, 8000);
                if (searchValue.length > 2) {
                    this.searchLoading = true;
                    this.httpClient.get(`${environment.api}/search?search=${searchValue}`).subscribe((data: any) => {
                        this.listings = data.data.listings;
                        this.searchLoading = false;
                    });
                } else {
                    this.listings = [];
                    this.searchLoading = false;
                }
            }, 300);
        }
    }

    selectListing(listing: any) {
        this.listings = [];
        const listing_title = listing.listing_title.replace(/ /g, '-').replace(/%/g, '').replace(/(\(|\))/g, '');
        const url  = `/item/${listing.listing_id}/${listing_title}`;
        window.location.href = url;
    }
}
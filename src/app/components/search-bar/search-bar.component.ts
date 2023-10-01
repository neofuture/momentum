import {Component, HostBinding} from "@angular/core";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {LoadingComponent} from "@/components/loading";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";

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
        JsonPipe
    ],
    standalone: true


})

export class SearchBarComponent {
    @HostBinding('class.search-bar')
    protected readonly hbClass = true;

    inputFocus: boolean = false;
    searchText: string = '';
    searchDeBounce: any;
    timer1: any;
    timer2: any;
    listings: any = [];
    searchLoading = false;
    searchingText = 'Searching';
    searchCompleted = false;
    private params: Params;
    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute
    ) {
        this.params = this.activatedRoute.snapshot.queryParams;
        if(this.params.search) {
            this.searchText = this.params.search;
        }
    }

    setFocus() {
        this.inputFocus = true;
        this.searchLoading = false;
    }

    setBlur() {
        this.inputFocus = false;
        this.searchText = '';
    }

    search(event: any) {
        if (event.key === 'Escape') {
            this.listings = [];
            this.searchText = '';
            event.target.blur();
        }

        if (event.key === 'Enter') {
            this.listings = [];
            const url = `/search/?search=${event.target.value}&page=1`;
            window.location.href = url;
        } else {
            clearTimeout(this.searchDeBounce);
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
            this.searchDeBounce = setTimeout(() => {

                let searchValue = event.target.value;
                this.searchLoading = true;
                this.listings = [];
                this.searchingText = 'Searching';
                this.timer1 = setTimeout(() => {
                    this.searchingText = 'Still searching';
                }, 3000);
                this.timer2 = setTimeout(() => {
                    this.searchingText = 'Please wait. Still searching';
                }, 8000);
                if (searchValue.length > 2) {
                    this.searchLoading = true;
                    this.httpClient.get(`${environment.api}/search?search=${searchValue}`).subscribe((data: any) => {
                        this.listings = data.data.listings;
                        this.searchLoading = false;
                        this.searchCompleted = true;
                    });
                } else {
                    this.listings = [];
                    this.searchLoading = false;
                }
            }, 500);
        }
    }

    selectListing(listing: any) {
        this.listings = [];
        const listing_title = listing.listing_title.replace(/ /g, '-').replace(/%/g, '').replace(/(\(|\))/g, '');
        const url = `/item/${listing.listing_id}/${listing_title}`;
        window.location.href = url;
    }
}
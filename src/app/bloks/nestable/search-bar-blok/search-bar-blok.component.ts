import {Component, HostBinding, OnInit} from "@angular/core";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FormsModule} from "@angular/forms";
import {LoadingComponent} from "@/components/loading";

@Component({
    selector: 'app-search-bar-blok',
    templateUrl: './search-bar-blok.component.html',
    styleUrls: ['./search-bar-blok.component.css'],
    standalone: true,
    imports: [
        JsonPipe,
        AsyncPipe,
        CurrencyPipe,
        StoryblokRenderDirective,
        NgForOf,
        NgIf,
        HttpClientModule,
        FormsModule,
        LoadingComponent
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
})
export class SearchBarBlokComponent implements OnInit {
    @HostBinding('class.search-bar')
    protected readonly hbClass = true;
    inputFocus: boolean = false;
    searchText: string = '';
    searchDeBounce: any;
    listings: any = [];
    searchLoading = false;

    constructor(
        private httpClient: HttpClient
    ) {
    }

    ngOnInit() {
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
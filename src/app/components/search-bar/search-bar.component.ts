import {Component, HostBinding} from "@angular/core";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {LoadingComponent} from "@/components/loading";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

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

    categories = [
        {value: 0, label: 'All Categories'},
        {value: 20081, label: 'Antiques'},
        {value: 550, label: 'Art'},
        {value: 2, label: 'Automotive'},
        {value: 2984, label: 'Baby'},
        {value: 267, label: 'Books, Comics & Magazines'},
        {value: 12576, label: 'Business, Office & Industrial'},
        {value: 625, label: 'Cameras & Photography'},
        {value: 11450, label: 'Clothes, Shoes & Accessories'},
        {value: 11116, label: 'Coins'},
        {value: 1, label: 'Collectables'},
        {value: 58058, label: 'Computers/Tablets & Networking'},
        {value: 14339, label: 'Crafts'},
        {value: 237, label: 'Dolls & Bears'},
        {value: 11232, label: 'DVDs, Films & TV'},
        {value: 1305, label: 'Events Tickets'},
        {value: 99, label: 'Everything Else'},
        {value: 159912, label: 'Garden & Patio'},
        {value: 26395, label: 'Health & Beauty'},
        {value: 3252, label: 'Holidays & Travel'},
        {value: 11700, label: 'Home, Furniture & DIY'},
        {value: 281, label: 'Jewellery & Watches'},
        {value: 15032, label: 'Mobile Phones & Communication'},
        {value: 11233, label: 'Music'},
        {value: 619, label: 'Musical Instruments'},
        {value: 1281, label: 'Pet Supplies'},
        {value: 870, label: 'Pottery, Porcelain & Glass'},
        {value: 10542, label: 'Property'},
        {value: 293, label: 'Sound & Vision'},
        {value: 888, label: 'Sporting Goods'},
        {value: 64482, label: 'Sports Memorabilia'},
        {value: 260, label: 'Stamps'},
        {value: 220, label: 'Toys & Games'},
        {value: 131090, label: 'Vehicle Parts & Accessories'},
        {value: 1249, label: 'Video Games & Consoles'},
        {value: 40005, label: 'Wholesale & Job Lots'}
    ];

    inputFocus: boolean = false;
    searchText: string = '';
    searchDeBounce: any;
    timer1: any;
    timer2: any;
    listings: any = [];
    searchLoading = false;
    searchingText = 'Searching';
    searchCompleted = false;
    category: string = '';
    selectedCategory: number = 0;
    private params: Params;
    private searchObs: Subscription | undefined;

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute
    ) {
        this.params = this.activatedRoute.snapshot.queryParams;
        if (this.params.search) {
            this.searchText = this.params.search;
        }
        if (this.params.cat_id) {
            this.selectedCategory = parseInt(this.params.cat_id);
        }
    }

    setFocus() {
        this.inputFocus = true;
        this.searchLoading = false;
    }

    setBlur() {
        this.inputFocus = false;
    }

    search(event: any) {
        if (event.key === 'Escape') {
            this.listings = [];
            this.searchText = '';
            event.target.blur();
        }

        if (event.key === 'Enter') {
            this.listings = [];
            let categoryName = 'abc';
            for (const category of this.categories) {
                if (category.value === parseInt(String(this.selectedCategory), 10)) {
                    categoryName = category.label;
                }
            }
            const url = `/search/?search=${event.target.value}&page=1&cat_id=${this.selectedCategory}&category=${categoryName}`;
            window.location.href = url;
            this.searchObs?.unsubscribe();
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
                    this.searchObs = this.httpClient.get(`${environment.api}/search?search=${searchValue}`).subscribe((data: any) => {
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
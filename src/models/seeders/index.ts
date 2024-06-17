
import userSeeder from './userSeeder';
import themesSeeder from './themeSeeder';
import contentSeeder from './contentSeeder';
import categorySeeder from './categorySeeder';

export default function runSeeder() {
	userSeeder()
	.then(categorySeeder)
	.then(themesSeeder)
	.then(contentSeeder)

}
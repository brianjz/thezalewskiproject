const CensusEntry1900 = (props) => {
    const person = props.person

    return (
		<table class="death-item table table-striped">
			<tbody>
				<tr class="odd">
					<td class="rowName">Year:</td>

					<td class="rowEntry">1900</td>
				</tr>
				
				<tr class="odd">
					<td class="rowName">Ward:</td>

					<td class="rowEntry">{person.ward}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Enumeration District:</td>

					<td class="rowEntry">{person.ed}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Page:</td>

					<td class="rowEntry">{person.page}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Street:</td>

					<td class="rowEntry">{person.street}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">House Number:</td>

					<td class="rowEntry">{person.house}</td>
				</tr>

				<tr class="even">
					<td class="rowName">Dwelling Number:</td>

					<td class="rowEntry">{person.dwelling}</td>
				</tr>

				<tr class="even">
					<td class="rowName">Family Number:</td>

					<td class="rowEntry">{person.family}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Surname:</td>

					<td class="rowEntry">{person.surname}</td>
				</tr>

				<tr class="even">
					<td class="rowName">Given Names:</td>

					<td class="rowEntry">{person.firstname}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Color/Race:</td>

					<td class="rowEntry">{person.color}</td>
				</tr>

				<tr class="even">
					<td class="rowName">Sex/Gender:</td>

					<td class="rowEntry">{person.sex}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Age:</td>

					<td class="rowEntry">{person.age}</td>
				</tr>

				<tr class="even">
					<td class="rowName">Birth Month:</td>

					<td class="rowEntry">{person.birthmonth}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Birth Year:</td>

					<td class="rowEntry">{person.birthyear}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Relation to Head of Household:</td>

					<td class="rowEntry">{person.relation}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Civil:</td>

					<td class="rowEntry">{person.civil}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Years Married:</td>

					<td class="rowEntry">{person.marriedyears}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Children Born:</td>

					<td class="rowEntry">{person.childrenborn}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Children Still Living:</td>

					<td class="rowEntry">{person.childrenliving}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Birthplace:</td>

					<td class="rowEntry">{person.birth}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Father's Birthplace:</td>

					<td class="rowEntry">{person.fatherbirth}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Mother's Birthplace:</td>

					<td class="rowEntry">{person.motherbirth}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Immigration Year:</td>

					<td class="rowEntry">{person.immigration}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Years in US:</td>

					<td class="rowEntry">{person.yearsinus}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Naturalization:</td>

					<td class="rowEntry">{person.naturalization}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Profession:</td>

					<td class="rowEntry">{person.profession}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Months Unemployed:</td>

					<td class="rowEntry">{person.unemployed}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Can Read?:</td>

					<td class="rowEntry">{person._read}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Can Write?:</td>

					<td class="rowEntry">{person._write}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Can Speak English?:</td>

					<td class="rowEntry">{person.speakenglish}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Own or Rent:</td>

					<td class="rowEntry">{person.ownorrent}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Own or Mortgage:</td>

					<td class="rowEntry">{person.ownormortgage}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Farm or House:</td>

					<td class="rowEntry">{person.farmorhouse}</td>
				</tr>

				<tr class="odd">
					<td class="rowName">Farm Schedule:</td>

					<td class="rowEntry">{person.farmschedule}</td>
				</tr>

			</tbody>
		</table>
    )
}

export default CensusEntry1900;